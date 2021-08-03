import React from 'react'
import AppHeader from '../../components/layout/AppHeader'
import NewTransactionMenu from '../../components/TransactionForm/NewMenu'
import { useStoreData } from '../../stores'

function useNewTransaction() {
  return useStoreData(({ screens: { newTransaction } }) => ({
    receipt: newTransaction.selectedReceipt,
    series: newTransaction.series,
    loaded: !newTransaction.isLoading,
    selectedDate: newTransaction.selectedDate,
    url: newTransaction.url,

    detachReceipt: newTransaction.detachReceipt,
    attachReceipt: newTransaction.attachReceipt
  }))
}

export default function NewTransactionHeader(props) {
  const {
    receipt,
    series,
    loaded,
    selectedDate,
    url,

    detachReceipt,
    attachReceipt
  } = useNewTransaction()

  return (
    <AppHeader {...props}>
      {loaded && <NewTransactionMenu
        onAttachReceipt={attachReceipt}
        onDetachReceipt={detachReceipt}
        series={series}
        url={url}
        date={selectedDate}
        receipt={receipt}/>}
    </AppHeader>
  )
}