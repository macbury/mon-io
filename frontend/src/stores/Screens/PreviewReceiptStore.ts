import { action, flow, observable, computed } from 'mobx'

import { NonPersistableStore } from '../SubStore'
import { Receipt } from '../../api/graphql'

export default class PreviewReceiptStore extends NonPersistableStore {
  @observable
  public currentReceipt : Receipt = null

  public reload = flow(function * (this : PreviewReceiptStore) {
    if (this.currentReceipt) {
      this.currentReceipt = yield this.root.screens.receipts.find(this.currentReceipt.id)
    }
  }.bind(this))

  public fetch = flow(function * (this : PreviewReceiptStore, receiptId : string) {
    this.state = "Loading"
    try {
      this.currentReceipt = yield this.root.screens.receipts.find(receiptId)
    } catch (e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: () => this.fetch(receiptId)
      })
    }
    this.state = "Ready"
  }.bind(this))

  @computed
  public get downloadUrl() {
    if (!this.currentReceipt) {
      return null
    }
    return {
      url: this.currentReceipt.fileUrl,
      httpHeaders: {
        'Authorization': 'Token token=' + this.root.session.accessToken
      }
    }
  }

  @action public async clear() {
    this.currentReceipt = null
    this.state = "None"
  }
}