import { action, observable, flow } from 'mobx'
import { NonPersistableStore } from '../SubStore'
import { Receipt } from '../../api/graphql'
import logger from '../../helpers/logger'

export default class ReceiptPickerDialogStore extends NonPersistableStore {
  private log = logger('ReceiptPickerDialogStore')
  private callback : (receipt : Receipt) => void
  @observable
  public receipts : Receipt[] = []

  @observable
  public visible : boolean = false

  /**
   * Fetch receipts from cache, and then try to refresh them from backend
   */
  public refresh = flow(function * (this : ReceiptPickerDialogStore) {
    this.state = this.receipts && this.receipts.length > 0 ? 'Refreshing' : 'Loading'

    try {
      this.log('Loading data from api')
      this.receipts = yield this.api.receipts.getAll()
    } catch(e) {
      this.root.ui.notifications.show({
        message: e.toString()
      })
    }
    this.state = "Ready"
  })

  @action
  public show = () => {
    this.visible = true
    if (!this.isLoading || !this.isRefreshing) {
      this.refresh()
    }

    return new Promise<Receipt>((resolve) => {
      this.callback = resolve
    })
  }

  @action
  public respondWith = (receipt : Receipt) => {
    this.visible = false
    this.callback(receipt)
    this.callback = null
  }

  @action
  public async clear() {
    this.callback = null
    this.visible = false
  }
}