import { Receipt, PlannedTransaction, Series, Import } from '../../../api/graphql'
import { ItemActions } from '../Menu'

export interface IPendingItemProps extends ItemActions {
  item: Receipt
}

export interface IDetailedReceiptTableProps extends ItemActions {
  pendingReceipts: Array<Receipt>
  imports: Array<Import>
  plannedTransactions: Array<PlannedTransaction>
  onPlannedTransactionActionsShow(series : Series, date : string)
  onFileSelect(file : Array<File>)
}