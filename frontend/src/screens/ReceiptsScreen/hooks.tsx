import { useStoreData } from '../../stores'

export function useReceipts() {
  return useStoreData(({ screens: { receipts, uploadReceipts, createReceipt, imports }, categories }) => ({
    pendingReceipts: receipts.sortedPendingReceipts,
    awaitingUploadReceipts: uploadReceipts.awaitingUploadReceipts,
    categories: categories.expensesAndLoans || [],
    saving: receipts.isSaving,
    plannedTransactions: receipts.planned.transactions || [],
    refreshing: receipts.isRefreshing,
    imports: imports.pending,

    destroyReceipt: receipts.destroyReceipt,
    refresh: receipts.refresh,
    createForFiles: receipts.createForFiles,
    changeCategory: receipts.changeCategory,
    cancelUpload: uploadReceipts.cancelUpload,
    submit: createReceipt.submit,
    ignoreDate: receipts.planned.ignoreDate
  }))
}
