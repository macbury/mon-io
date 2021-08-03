import { action, flow, observable, computed, autorun } from 'mobx'
import logger from '../../helpers/logger'
import SubStore from '../SubStore'
import PlannedTransactionsStore from '../PlannedTransactionsStore'
import { Receipt, LocationInput } from '../../api/graphql'
import { getCurrentLocation } from '../../helpers/geolocation'

const CSV_TYPE = 'text/csv'

export default class ReceiptsStore extends SubStore<any> {
  private log = logger('ReceiptsStore')
  @observable
  public pendingReceipts : Receipt[] = []
  private bootComplete : boolean
  public planned : PlannedTransactionsStore

  constructor(root) {
    super(root)
    autorun(() => {
      if (this.bootComplete) {
        this.persist()
      }
    })

    this.planned = new PlannedTransactionsStore(root)
  }

  @computed
  public get sortedPendingReceipts() : Array<Receipt> {
    return this.pendingReceipts.slice() // TODO sort by date!
  }

  @action
  public push(receipt : Receipt) {
    this.pendingReceipts = [...this.pendingReceipts, receipt]
  }

  @action
  public remove(receiptId : string) {
    this.pendingReceipts = this.pendingReceipts.filter(({ id }) => id !== receiptId)
  }

  /**
   * Update existing receipt in local list
   * @param receipt
   */
  @action.bound
  public update(receipt : Receipt) {
    this.pendingReceipts = this.pendingReceipts.map((existingReceipt : Receipt) => (receipt.id === existingReceipt.id ? receipt : existingReceipt))
    this.persist()
  }

  /**
   * Find receipt in local store or fetch it from server
   */
  public find = flow(function * (this : ReceiptsStore, receiptId : string) {
    const receipt = this.pendingReceipts.find(({ id }) => id === receiptId)
    if (receipt) {
      return { ...receipt }
    }

    return yield this.api.receipts.fetchReceipt(receiptId)
  })

  /**
   * Fetch receipts from cache, and then try to refresh them from backend
   */
  public refresh = flow(function * (this : ReceiptsStore) {
    yield this.restore()

    this.bootComplete = true

    if (this.pendingReceipts) {
      this.log('Refreshing pending receipts in background')
      this.fetchAll()
    } else {
      this.log('Refreshing pending receipts')
      this.pendingReceipts = []
      yield this.fetchAll()
    }
  }.bind(this))

  /**
   * Fetch all receipts from backend
   */
  public fetchAll = flow(function * (this : ReceiptsStore) {
    this.state = this.pendingReceipts && this.pendingReceipts.length > 0 ? 'Refreshing' : 'Loading'

    try {
      this.log('Loading data from api')
      const [_planned, _imports, pendingReceipts] = yield Promise.all([
        this.planned.refresh(),
        this.root.screens.imports.fetchPending(),
        this.api.receipts.getAll()
      ])
      this.pendingReceipts = pendingReceipts
      yield this.persist()
    } catch(e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: this.fetchAll
      })
    }
    this.state = "Ready"
  }.bind(this))

  /**
   * Create multiple receipts
   */
  public createForFiles = flow(function * (this : ReceiptsStore, files : Array<File>) {
    if (files.length === 0) {
      this.log('could not upload receipts files, array is empty!')
    }

    this.state = "Saving"
    yield this.ui.progressDialog.show('dialogs.receipts.upload.title')

    const location = yield getCurrentLocation()

    while(files.length > 0) {
      const file = files.shift()

      if (file.type === CSV_TYPE) {
        yield this.uploadCsv(file)
      } else {
        yield this.uploadReceipt(file, location)
      }
    }

    this.state = "Ready"
    yield this.ui.progressDialog.close()
  }.bind(this))

  private uploadReceipt = flow(function * (this : ReceiptsStore, file: File, location: LocationInput) {
    const { receipt, errors } = yield this.api.receipts.createReceipt({ file, location })

    if (errors.length > 0) {
      this.root.ui.notifications.showSuccess(errors)
    } else {
      this.pendingReceipts.push(receipt)
      this.root.ui.notifications.showSuccess('success.receipts.upload')
      yield this.persist()
    }
  }.bind(this))

  private uploadCsv = flow(function * (this : ReceiptsStore, file: File) {
    const payload = yield this.api.imports.create({ file })

    if (payload.errors.length > 0) {
      this.root.ui.notifications.showErrors(payload.errors)
    } else {
      console.log('payload.import', payload.import)
      this.root.ui.notifications.showSuccess('success.import.created')
      yield this.root.screens.imports.refresh()
    }
  }.bind(this))

  /**
   * Change category for the receipt
   */
  public changeCategory = flow(function * (this : ReceiptsStore, { id, category } : Receipt){
    const result = yield this.ui.categoryPicker.pickCategory(category)
    if (!result.category) {
      return
    }

    const { receipt, errors } = yield this.api.receipts.updateReceipt({
      id,
      categoryId: result.category.id
    })

    if (errors.length > 0) {
      this.root.ui.notifications.showErrors(errors)
    } else {
      this.pendingReceipts = this.pendingReceipts.map((existingReceipt) => existingReceipt.id === receipt.id ? receipt : existingReceipt )
      yield this.root.screens.previewReceipt.reload()
    }
  }.bind(this))

  /**
   * Destroy receipt on the backend
   */
  public destroyReceipt = flow(function * (this : ReceiptsStore, receiptId : string) {
    const success : boolean = yield this.root.ui.confirm.show(
      'dialogs.receipts.delete.title',
      'dialogs.receipts.delete.message',
    )

    if (!success) {
      return false
    }

    const receipt = yield this.find(receiptId)

    try {
      this.pendingReceipts = this.pendingReceipts.filter((existingReceipt) => existingReceipt.id !== receiptId)
      yield this.api.receipts.destroyReceipt(receiptId)
      this.root.ui.notifications.showSuccess('success.receipts.destroy')
      return true
    } catch (e) {
      this.pendingReceipts.push(receipt)
      this.root.ui.notifications.showError(e, () => {
        this.destroyReceipt(receiptId)
      })
      return false
    }
  }.bind(this))

  @action
  public async clear() {
    this.state = "None"
    this.pendingReceipts = []
  }

  get cacheKey(): string {
    return 'receipts'
  }

  protected toBundle() {
    const {
      pendingReceipts
    } = this

    return {
      pendingReceipts
    }
  }

  protected loadBundle({ pendingReceipts }: any) {
    this.pendingReceipts = pendingReceipts
  }
}