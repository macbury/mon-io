import { flow, observable } from 'mobx'
import moment from 'moment-timezone'
import { Transaction, TransactionCategoryKind, UpdateTransactionInput, TransactionAttributesInput } from '../../api/graphql'
import BaseTransactionFormStore from '../BaseTransactionFormStore'

export default class EditTransactionStore extends BaseTransactionFormStore {
  @observable
  public transactionId : string
  @observable
  public transaction : Transaction

  public get isNewRecord() {
    return false
  }

  public load = flow(function * (this : EditTransactionStore, transactionId: string) {
    this.transaction = null
    this.clear()
    this.state = "Loading"

    try {
      this.transaction = yield this.root.screens.summary.find(transactionId)
    } catch (error) {
      this.root.ui.notifications.show({
        message: error.toString(),
        retryAction: () => this.load(transactionId)
      })

      return
    }

    if (!this.transaction) {
      this.state = "NotFound"
      return
    }

    this.series = this.transaction.series
    this.transactionId = this.transaction.id
    this.selectedCategory = this.transaction.category
    this.selectedDate = moment(this.transaction.date)
    this.selectedReceipt = this.transaction.receipt
    this.selectedLocation = this.transaction.location
    this.recurrence = this.transaction.recurrence
    this.type = this.transaction.kind as TransactionCategoryKind
    this.calculator.setValue(this.transaction.amount)
    this.currency = this.transaction.amount.currency
    this.notes = this.transaction.notes
    this.url = this.transaction?.link?.url
    this.importId = this.transaction?.import?.id
    this.state = "Ready"

  }.bind(this))

  public save = flow(function * (this : EditTransactionStore) {
    try {
      if (this.calculator.operator) {
        this.calculator.calculate()
        return false
      } else {
        this.state = "Saving"
        yield this.ui.progressDialog.show('dialogs.saving')
  
        const variables : UpdateTransactionInput = {
          id: this.transactionId,
          attributes: {
            amountCents: this.amount,
            categoryId: this.categoryId,
            date: this.selectedDate.toISOString(),
            locationId: this.locationId,
            notes: this.notes,
            receiptId: this.receiptId,
            amountCurrency: this.currency.isoCode,
            kind: this.type
          }
        }
        const { errors } = yield this.api.transactions.update(variables)
  
        if (errors.length > 0) {
          this.root.ui.notifications.show({
            message: errors.join(','),
            retryAction: this.save
          })
        } else {
          yield this.api.transactions.updateMetadataUrl({
            transactionId: this.transactionId,
            url: this.url
          })
          this.root.ui.notifications.showSuccess('success.transactions.updated')
          this.root.screens.summary.refreshCurrentDate()
        }
        this.state = "Ready"
        return errors.length === 0
      }
    } finally {
      yield this.ui.progressDialog.close()
    }
  }.bind(this))
}