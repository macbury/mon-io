import { useStoreData } from '../../stores'

export function useSeriesStore() {
  return useStoreData(({ screens: { series } }) => ({
    changeMonth: series.changeMonth,
    reload: series.reload,
    toggleCategory: series.filter.toggleCategory,
    selectOnlyCategory: series.filter.selectOnlyCategory,
    showCalendarUrl: series.showCalendarUrl,

    selectedCategoriesIds: series.filter.selectedCategoriesIds,
    currentDate: series.currentDate,
    calendarUrl: series.calendarUrl,
    scrollIndex: series.scrollIndex,
    loading: series.isLoading || series.isNone,
    refreshing: series.isRefreshing,
    currentMonth: series.currentMonth,
    groupedByDate: series.groupedByDate,
    markedDates: series.markedDates,
    categoryOptions: series.filter.options
  }))
}