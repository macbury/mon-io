import { useStoreData } from '../../stores'

export default function useTransactions() {
  return useStoreData(({ screens: { transactions } }) => ({
    result: transactions.result,
    loading: transactions.result?.isLoading,
    categoriesFilter: transactions.categoryFilter.options,
    selectedCategoriesIds: transactions.categoryFilter.selectedCategoriesIds,
    paginationKey: transactions.result?.paginationKey,
    totalCount: transactions.result?.totalCount,
    fromDate: transactions.fromDate,
    toDate: transactions.toDate,
    filtersDialogVisible: transactions.filtersDialogVisible,
    series: transactions.series,
    receipts: transactions.receipts,
    imported: transactions.imported,

    search: transactions.search,
    fetchPagesByIndexes: transactions?.result?.fetchPagesByIndexes,
    getItem: transactions?.result?.getItem,
    toggleCategory: transactions.categoryFilter.toggleCategory,
    selectOnlyCategory: transactions.categoryFilter.selectOnlyCategory,
    pickFromDate: transactions.pickFromDate,
    pickToDate: transactions.pickToDate,
    setDateRange: transactions.setDateRange,
    hideFilterDialog: transactions.hideFiltersDialog,
    showFiltersDialog: transactions.showFiltersDialog,
    adjustIsPlannedFilter: transactions.adjustIsPlannedFilter,
    adjustHaveAttachedBillFilter: transactions.adjustHaveAttachedBillFilter,
    adjustImportFilter: transactions.adjustImportFilter
  }))
}
