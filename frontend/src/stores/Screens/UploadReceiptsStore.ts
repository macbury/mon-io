import { action, flow, observable, autorun, computed } from 'mobx'
import { NonPersistableStore } from '../SubStore'
import { PendingReceipt, SyncQueue, SyncUploadReceiptsModule } from '../../modules/SyncUploadReceiptsModule'
import { Receipt } from '../../api/graphql'
import logger from '../../helpers/logger'

export default class UploadReceiptsStore extends NonPersistableStore {
  private queue : SyncQueue
  private log = logger('UploadReceiptsStore')

  @observable
  public pending : Array<PendingReceipt> = []

  @computed
  public get awaitingUploadReceipts() {
    return this.pending.slice()
  }

  constructor(root) {
    super(root)
    this.queue = new SyncQueue()
    autorun(() => this.refresh())
    this.queue.subscribe(this.onUploadFinished)
  }

  private onUploadFinished = flow(function * (this : UploadReceiptsStore, newReceipt : Receipt) {
    yield this.refresh()
    this.root.screens.receipts.push(newReceipt)
  }.bind(this))

  public cancelUpload = flow(function * (this : UploadReceiptsStore, clientMutationId : string) {
    yield this.queue.remove(clientMutationId)
    yield this.refresh()
  }.bind(this))

  public refresh = flow(function * (this : UploadReceiptsStore) {
    this.log('Refreshing sync queue')
    this.pending = yield this.queue.getAll()
  })

  /**
   * Start uploading of receipts
   */
  @action
  public pushExisting = () => {
    if (this.pending.length > 0) {
      SyncUploadReceiptsModule.sync() //causes race condition
    }
  }

  /**
   * Send receipt in foreground
   */
  public add = flow(function * (this : UploadReceiptsStore, pendingReceipt : PendingReceipt) {
    yield this.queue.push(pendingReceipt)
    yield this.refresh()
    this.pushExisting()
  })

  @action public async clear() {
    this.pending = []
  }
}