import { action, flow, observable } from 'mobx'

import { NonPersistableStore } from '../SubStore'
import { Category, Receipt } from '../../api/graphql'

export default class UpdateReceiptStore extends NonPersistableStore {
  @observable
  public currentReceipt : Receipt = null
  @observable
  public selectedCategory : Category

  @action
  public setCategory = (category : Category) => {
    if (category && category.id) {
      this.selectedCategory = category
    } else {
      this.selectedCategory = null
    }
  }

  /**
   * Fetch receipt to update
   */
  public fetch = flow(function * (this : UpdateReceiptStore, receiptId : string) {
    this.currentReceipt = null
    this.selectedCategory = null
    this.state = "Loading"
    try {
      this.currentReceipt = yield this.api.receipts.fetchReceipt(receiptId)
      if (this.currentReceipt) {
        this.selectedCategory = this.currentReceipt.category
      } else {
        this.root.ui.notifications.show({
          message: 'Receipt not found',
          retryAction: () => this.fetch(receiptId)
        })
      }
    } catch (e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: () => this.fetch(receiptId)
      })
    }
    this.state = "Ready"
  }.bind(this))

  /**
   * Change receipt category
   */
  public save = flow(function * (this : UpdateReceiptStore) {
    const { receipt, errors } = yield this.api.receipts.updateReceipt({
      id: this.currentReceipt.id,
      categoryId: this.selectedCategory ? this.selectedCategory.id : null
    })

    if (errors.length > 0) {
      this.root.ui.notifications.show({
        message: errors.join(','),
        retryAction: this.save
      })
    } else {
      this.root.screens.receipts.update(receipt)
      yield this.clear()
    }
  }.bind(this))

  @action public async clear() {
    this.state = "None"
    this.currentReceipt = null
    this.selectedCategory = null
  }
}