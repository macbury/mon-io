import { useNavigationParam } from 'react-navigation-hooks'
import { useStoreData } from '../../stores'

export function useEditSeriesStore() {
  return useStoreData(({ screens: { editSeries } }) => ({
    loading: editSeries.isLoading,
    saving: editSeries.isSaving,
    category: editSeries.selectedCategory,
    currency: editSeries.currency,
    primaryColor: editSeries.primaryColor,
    amount: editSeries.calculator.value,
    hasOperation: editSeries.calculator.hasOperation,
    valid: editSeries.valid,
    url: editSeries.url,
    location: editSeries.selectedLocation,
    recurrence: editSeries.recurrence,
    transactionType: editSeries.type,
    notes: editSeries.notes,
    selectedDate: editSeries.selectedDate,
    isNewRecord: false,
    series: editSeries.series,
    recurrenceEndAt: editSeries.recurrenceEndAt,
    metadata: editSeries.metadata,

    setRecurrenceEndAt: editSeries.setRecurrenceEndAt,
    setAmount: editSeries.setAmount,
    changeCurrency: editSeries.changeCurrency,
    changeCategory: editSeries.changeCategory,
    setRecurrence: editSeries.setRecurrence,
    setDate: editSeries.setDate,
    pushDigit: editSeries.calculator.pushDigit,
    pushOperator: editSeries.calculator.pushOperator,
    calculate: editSeries.calculator.calculate,
    backspace: editSeries.calculator.delete,
    load: editSeries.load,
    save: editSeries.save
  }))
}

export function useEditSeriesParams() {
  const seriesId = useNavigationParam('seriesId')
  const date = useNavigationParam('date')
  const updateType = useNavigationParam('updateType')

  return { seriesId, date, updateType }
}