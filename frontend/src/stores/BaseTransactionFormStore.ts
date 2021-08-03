import { action, flow, observable, computed } from 'mobx'
import moment, { Moment } from 'moment-timezone'
import TransactionMetadataStore from './TransactionMetadataStore'
import { NonPersistableStore } from './SubStore'
import { CalculatorStore } from './CalculatorStore'
import { Receipt, Category, Location, TransactionCategoryKind, Currency, Recurrence, Series } from '../api/graphql'
import { getCurrentLocation } from '../helpers/geolocation'

/**
 * Store containing shared logic used by save store and new transaction store
 */
export default abstract class BaseTransactionFormStore extends NonPersistableStore {
  public metadata : TransactionMetadataStore
  @observable
  public seriesDate : Moment = null
  @observable
  public series : Series = null
  @observable
  public selectedReceipt : Receipt = null
  @observable
  public selectedCategory : Category
  @observable
  public selectedLocation : Location
  @observable
  public selectedDate : Moment
  @observable
  public calculator : CalculatorStore
  @observable
  public recurrence : Recurrence
  @observable
  public type : TransactionCategoryKind = TransactionCategoryKind.Expense
  @observable
  public notes : string = ''
  @observable
  public currency : Currency
  @observable
  public importId : string
  @observable
  public recurrenceEndAt? : Moment
  @observable
  public url : string = ''

  constructor(root) {
    super(root)
    this.metadata = new TransactionMetadataStore(this.root, this)
    this.state = "Loading"
    this.calculator = new CalculatorStore(this.root)
  }

  public abstract get isNewRecord() : boolean;


  @computed
  protected get categoryId() {
    return this.selectedCategory ? this.selectedCategory.id : null
  }

  @computed
  protected get receiptId() {
    return this.selectedReceipt ? this.selectedReceipt.id : null
  }

  @computed
  protected get locationId() {
    return this.selectedLocation ? this.selectedLocation.id : null
  }

  protected getTransactionAttributes = flow(function * (this : BaseTransactionFormStore) {
    let location = this.selectedLocation ? { lat: this.selectedLocation.lat, lng: this.selectedLocation.lng } : null
    if (!location) {
      location = yield getCurrentLocation()
    }

    return {
      kind: this.type,
      amount: this.amount,
      currency: this.currency.isoCode,
      categoryId: this.categoryId,
      receiptId: this.receiptId,
      date: this.selectedDate.toISOString(),
      seriesId: this.series?.id,
      seriesDate: this.seriesDate?.format('YYYY-MM-DD'),
      location,
      notes: this.notes
    }
  })

  @action.bound
  protected setCategory(category : Category) {
    if (category && category.id) {
      this.selectedCategory = category
    } else {
      this.selectedCategory = null
    }
  }

  @action.bound
  public setAmount(newAmount : string) {
    this.calculator.calculate()
    this.calculator.parseAmount(newAmount)
  }

  /**
   * Show ui with date picker
   */
  public changeCategory = flow(function * (this : BaseTransactionFormStore) {
    const { category, kind } = yield this.ui.categoryPicker.pickCategoryAndKind(this.selectedCategory, this.type)
    if (category) {
      this.setCategory(category)
      this.type = kind
    }
  }.bind(this))

  /**
   * Show currency picker dialog with list of currencies to pick
   */
  public changeCurrency = flow(function * (this : BaseTransactionFormStore) {
    const nextCurrency = yield this.ui.currencyPicker.show(this.currency)
    if (nextCurrency) {
      this.setCurrency(nextCurrency)
    }
  }.bind(this))

  @action.bound
  protected setCurrency(currency : Currency) {
    this.currency = currency
    this.calculator.setCurrency(currency)
  }

  @action.bound
  public setRecurrenceEndAt(endAt: Moment){
    this.recurrenceEndAt = endAt
  }

  @action.bound
  public setRecurrence(recurrence : Recurrence) {
    this.recurrence = recurrence
  }

  @action.bound
  public setDate(date : Moment) {
    this.selectedDate = date
    if (this.selectedDate.isAfter(moment()) && this.recurrence === Recurrence.None) {
      this.recurrence = Recurrence.Once
    }
  }

  @action.bound
  public buildFromSeries(series : Series, date : Moment) {
    const {
      recurrence,
      blueprint: {
        category,
        amount,
        notes,
        kind,
        link
      }
    } = series

    this.series = series
    this.recurrence = recurrence
    this.setCategory(category)
    this.setCurrency(amount.currency)
    this.url = link?.url
    this.type = kind
    this.notes = notes
    this.calculator.setValue(amount)
    this.seriesDate = date
    this.selectedDate = moment()
  }

  @computed
  protected get amount() {
    return this.calculator.cents
  }

  @computed
  public get valid() : boolean {
    return this.amount >= 0.0
  }

  @computed
  public get selectedReceiptFile() {
    if (!this.selectedReceipt) {
      return null
    }
    return {
      url: this.selectedReceipt.fileUrl,
      httpHeaders: {
        'Authorization': 'Token token=' + this.root.session.accessToken
      }
    }
  }

  public setReceiptFile = flow(function * (this : BaseTransactionFormStore, file : File) {
    this.state = "Loading"
    const { receipt, errors } = yield this.api.receipts.createReceipt({ file })
    if (errors.length > 0) {
      this.root.ui.notifications.show({
        message: errors.join(', ')
      })
    } else {
      this.selectedReceipt = receipt
    }
    this.state = "Ready"
  }.bind(this))

  /**
   * Color fetched from category of from receipt category
   */
  @computed
  public get primaryColor() {
    return this.selectedCategory ? this.selectedCategory.color : null
  }

  @action.bound
  public async clear() {
    this.calculator.clear()
    this.state = "None"
    this.notes = ''
    this.url = ''
    this.type = TransactionCategoryKind.Expense
    this.selectedLocation = null
    this.selectedDate = null
    this.selectedReceipt = null
    this.selectedCategory = null
    this.series = null
    this.importId = null
    this.recurrence = Recurrence.None
    this.recurrenceEndAt = null
    this.metadata.clear()
  }
}