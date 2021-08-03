import { useStoreData } from '../../stores'

export function useSummary() {
  return useStoreData(({ screens: { summary }, categories, settings }) => ({
    categories: categories.all,
    loading: summary.isLoading,
    summaryForCategories: summary.sortedCategories,
    sumOfCategoriesInCents: summary.sumOfCategoriesInCents,
    currentDate: summary.currentDate,
    transactions: summary.transactionsByDate,
    type: summary.type,
    mainCurrency: settings.mainCurrency,

    changeDate: summary.changeDate,
    refresh: summary.refreshCurrentDate
  }))
}
