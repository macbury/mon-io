import { useEffect } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useStoreData } from '../../stores'
import { Recurrence, TransactionCategoryKind } from '../../api/graphql'
import BaseTransactionFormStore from '../../stores/BaseTransactionFormStore'

export function useNewTransactionParams() {
  const navigation = useNavigation()

  const receiptId = navigation.getParam('receiptId')
  const categoryId = navigation.getParam('categoryId')
  const seriesId = navigation.getParam('seriesId')
  const recurrence = navigation.getParam('recurrence')
  let createdAt = navigation.getParam('createdAt')
  if (createdAt) {
    createdAt = decodeURIComponent(createdAt)
  }

  const kind = TransactionCategoryKind[navigation.getParam('kind')]

  return {
    receiptId,
    categoryId,
    seriesId,
    createdAt,
    kind,
    recurrence
  }
}

function buildBaseTransactionState(transactions : BaseTransactionFormStore) {
  return ({
    isNewRecord: transactions.isNewRecord,
    series: transactions.series,
    selectedReceiptFile: transactions.selectedReceiptFile,
    recurrence: transactions.recurrence,
    receipt: transactions.selectedReceipt,
    primaryColor: transactions.primaryColor,
    loading: transactions.isLoading,
    selectedDate: transactions.selectedDate,
    selectedCategory: transactions.selectedCategory,
    selectedLocation: transactions.selectedLocation,
    currency: transactions.currency,
    amount: transactions.calculator.value,
    hasOperation: transactions.calculator.hasOperation,
    valid: transactions.valid,
    notes: transactions.notes,
    url: transactions.url,
    saving: transactions.isSaving,
    transactionType: transactions.type,
    metadata: transactions.metadata,
    calculate: transactions.calculator.calculate,
    setAmount: transactions.setAmount,
    setDate: transactions.setDate,
    changeCategory: transactions.changeCategory,
    setReceiptFile: transactions.setReceiptFile,
    changeCurrency: transactions.changeCurrency,
    setRecurrence: transactions.setRecurrence,
    pushDigit: transactions.calculator.pushDigit,
    pushOperator: transactions.calculator.pushOperator,
    backspace: transactions.calculator.delete
  })
}

export function useNewTransaction(receiptId : string, categoryId : string, createdAt : string, seriesId : string, kind: TransactionCategoryKind, recurrence: Recurrence) {
  const state = useStoreData(({ screens: { newTransaction } }) => ({
    ...buildBaseTransactionState(newTransaction),
    initializeNew: newTransaction.initializeNew,
    save: newTransaction.save
  }))

  useEffect(() => {
    state.initializeNew(receiptId, categoryId, createdAt, seriesId, kind, recurrence)
  }, [receiptId, categoryId, createdAt, seriesId, kind])

  return state
}

export function useEditStore() {
  return useStoreData(({ screens: { editTransaction } }) => ({
    notFound: editTransaction.isNotFound,
    transaction: editTransaction.transaction,
    ...buildBaseTransactionState(editTransaction),
    load: editTransaction.load,
    save: editTransaction.save,
  }))
}

export function useEditTransaction(transactionId : string) {
  const state = useEditStore()

  useEffect(() => {
    state.load(transactionId)
  }, [transactionId])

  return state
}

export type NewTransactionHookReturn = ReturnType<typeof useNewTransaction>
export type EditTransactionHookReturn = ReturnType<typeof useEditTransaction>

export type BaseTransactionHookReturn = NewTransactionHookReturn | EditTransactionHookReturn