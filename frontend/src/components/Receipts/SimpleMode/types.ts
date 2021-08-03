import { Receipt, PlannedTransaction, Series, Import } from '../../../api/graphql'
import { PendingReceipt } from '../../../modules/SyncUploadReceiptsModule'
import { ItemActions } from '../Menu'

export interface IPendingItemProps extends ItemActions {
  item: Receipt
}

export interface IAwaitingUploadItemProps extends ItemActions {
  item: PendingReceipt
}

export interface ISimpleReceiptListProps extends ItemActions {
  plannedTransactions: PlannedTransaction[]
  pendingReceipts: Array<Receipt>
  imports: Array<Import>
  awaitingUploadReceipts: Array<PendingReceipt>
  refreshing: boolean
  onPlannedTransactionActionsShow(series : Series)
  onRefresh()
}

