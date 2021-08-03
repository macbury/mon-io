import { computed, flow, observable } from 'mobx'
import moment, { Moment } from 'moment-timezone'
import logger from '../../helpers/logger'
import BaseTransactionFormStore from '../BaseTransactionFormStore'
import { RecurrenceUpdateMode, Series, Transaction, TransactionCategoryKind, UpdateRecurrenceInput } from '../../api/graphql'

export default class EditSeriesStore extends BaseTransactionFormStore {
  private readonly log = logger('EditSeriesStore')
  @observable
  public seriesId : string
  @observable
  public series : Series
  @observable
  public blueprint : Transaction
  @observable
  public updateType : RecurrenceUpdateMode

  public get isNewRecord() {
    return false
  }

  public load = flow(function * (this : EditSeriesStore, seriesId: string, date: string | Moment, updateType: RecurrenceUpdateMode) {
    this.log('Loading series', seriesId)
    this.clear()
    this.state = "Loading"
    this.seriesId = seriesId
    this.series = null
    this.updateType = updateType

    try {
      this.series = yield this.api.series.find(seriesId)
    } catch (e) {
      this.log('Error on load:', e)
      this.ui.notifications.showError(e, () => this.load(seriesId))
      return
    }

    this.blueprint = this.series.blueprint
    this.selectedCategory = this.blueprint.category
    this.selectedDate = moment(date || this.blueprint.date)
    this.selectedReceipt = this.blueprint.receipt
    this.recurrence = this.series.recurrence
    this.type = this.blueprint.kind as TransactionCategoryKind
    this.calculator.setValue(this.blueprint.amount)
    this.currency = this.blueprint.amount.currency
    this.notes = this.blueprint.notes
    this.url = this.blueprint?.link?.url
    this.recurrenceEndAt = this.series.endAt ? moment(this.series.endAt) : null
    this.state = "Ready"
  }.bind(this))

  @computed
  private get updatePayload() : UpdateRecurrenceInput {
    return {
      seriesId: this.series.id,
      recurrence: this.recurrence,
      updateType: this.updateType,
      endAt: this.recurrenceEndAt?.format('YYYY-MM-DD'),
      transaction: {
        amountCents: this.amount,
        amountCurrency: this.currency.isoCode,
        categoryId: this.categoryId,
        date: this.selectedDate.toISOString(),
        notes: this.notes,
        kind: this.type
      }
    }
  }

  public save = flow(function * (this : EditSeriesStore) {
    try {
      if (this.calculator.operator) {
        this.calculator.calculate()
        return false
      }
  
      yield this.ui.progressDialog.show('pages.edit_series.saving')
      this.state = "Saving"
  
      const { errors } = yield this.api.series.update(this.updatePayload)
  
      if (errors.length > 0) {
        yield this.ui.notifications.showError(errors.join(', '))
        this.state = "Ready"
        return false
      }
      
      yield this.api.transactions.updateMetadataUrl({
        transactionId: this.series.blueprint.id,
        url: this.url
      })
      
      this.root.ui.notifications.showSuccess('success.series.updated')
  
      return true
    } finally {
      yield this.ui.progressDialog.close()
    }
  }.bind(this))
}