import { flow, action } from 'mobx'
import moment from 'moment-timezone'
import logger from '../../helpers/logger'
import { Recurrence, Receipt, TransactionCategoryKind, Transaction } from '../../api/graphql'
import BaseTransactionFormStore from '../BaseTransactionFormStore'
import { getCurrentLocation } from '../../helpers/geolocation'
import { editSummaryTransactionPath } from '../../helpers/urls'

export default class NewTransactionStore extends BaseTransactionFormStore {
  private readonly log = logger('NewTransactionStore')

  public get isNewRecord() {
    return true
  }

  public attachReceipt = flow(function * (this : NewTransactionStore) {
    const receipt : Receipt = yield this.ui.receiptPicker.show()
    if (receipt) {
      this.selectedReceipt = receipt
      yield this.ui.notifications.showSuccess('success.receipts.attached')
      return true
    } else {
      return false
    }
  }.bind(this))

  @action
  public detachReceipt = () => {
    this.selectedReceipt = null
  }

  public deleteReceipt = flow(function * (this : NewTransactionStore) {
    const confirmed : boolean = yield this.root.ui.confirm.show(
      'dialogs.receipts.delete.title',
      'dialogs.receipts.delete.message'
    )

    if (!confirmed) {
      return
    }

    if (yield this.root.screens.receipts.destroyReceipt(this.selectedReceipt.id)) {
      this.selectedReceipt = null
    }
  }.bind(this))

  /**
   * Initialize new transaction from passed params
   * @param receiptId
   * @param categoryId
   * @param createdAt
   * @param seriesId
   */
  public initializeNew = flow(function * (this : NewTransactionStore, receiptId? : string, categoryId? : string, createdAt? : string, seriesId? : string, kind?: TransactionCategoryKind, recurrence?: Recurrence) {
    this.clear()
    this.state = "Loading"
    this.recurrence = Recurrence.None
    this.type = kind || TransactionCategoryKind.Expense

    if (receiptId) {
      this.selectedReceipt = yield this.root.screens.receipts.find(receiptId)
    } else if (categoryId) {
      this.setCategory(this.root.categories.find(categoryId))
    }

    if (this.selectedReceipt) {
      this.selectedDate = moment(this.selectedReceipt.createdAt)
      this.selectedLocation = this.selectedReceipt.location
      this.setCategory(this.selectedReceipt.category)
    } else {
      this.selectedDate = null
    }

    this.setCurrency(this.selectedCategory?.currency || this.root.settings.mainCurrency)

    if (seriesId) {
      const series = yield this.api.series.find(seriesId)

      this.buildFromSeries(series, moment(createdAt))
    }

    if (!this.selectedDate) {
      this.selectedDate = createdAt ? moment(createdAt) : moment()
    }

    if (this.recurrence === Recurrence.None && recurrence) {
      this.recurrence = recurrence
    }

    this.state = "Ready"
    if (this.selectedLocation === null) {
      this.syncLocation()
    }
  }.bind(this))

  /**
   * Create new location
   */
  public syncLocation = flow(function * (this : NewTransactionStore) {
    try {
      const location = yield getCurrentLocation()
      this.selectedLocation = yield this.api.location.reverseGeocode(location)
    } catch (e) {
      this.root.ui.notifications.showErrorKey('errors.geocode', this.syncLocation)
    }
  }.bind(this))

  private createTransaction = flow(function * (this : NewTransactionStore) {
    const { transaction, errors } = yield this.api.transactions.create(yield this.getTransactionAttributes())
  
    if (errors.length > 0) {
      this.root.ui.notifications.show({
        message: errors.join(', ')
      })

      return false
    } else {
      return transaction
    }
  }.bind(this))

  private createSeries = flow(function * (this : NewTransactionStore, transaction : Transaction) {
    const response = yield this.api.series.create({
      recurrence: this.recurrence,
      transactionId: transaction.id
    })

    if (response.errors.length > 0) {
      this.root.ui.notifications.show({
        message: response.errors.join(',')
      })

      return false
    }

    if (transaction.receipt) {
      this.root.screens.receipts.remove(transaction.receipt.id)
    }

    return true
  }.bind(this))

  private createMetadataUrl = flow(function * (this : NewTransactionStore, transaction : Transaction) {
    const { errors } = yield this.api.transactions.updateMetadataUrl({ transactionId: transaction.id, url: this.url })
  
    if (errors.length > 0) {
      this.root.ui.notifications.show({
        message: errors.join(', ')
      })

      return false
    } else {
      return true
    }
  }.bind(this))

  public save = flow(function * (this : NewTransactionStore) {
    try {
      if (this.calculator.isDirty) {
        this.calculator.calculate()
        return false
      } else {
        yield this.ui.progressDialog.show('dialogs.saving')
        this.state = "Saving"
        
        const transaction : Transaction = yield this.createTransaction()
        console.log('transaction', transaction)
        if (transaction) {
          if (!(yield this.createSeries(transaction))) {
            return false
          }

          if (!(yield this.createMetadataUrl(transaction))) {
            return false
          }
          
          this.root.ui.notifications.editAction('success.transactions.created', editSummaryTransactionPath(transaction.id))
          return true
        } else {
          return false
        }
      }
    } finally {
      this.state = "Ready"
      yield this.ui.progressDialog.close()
    }
  }.bind(this))
}