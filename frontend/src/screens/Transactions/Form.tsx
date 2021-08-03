import React, { useCallback } from 'react'

import PreviewPdf from '../../components/PreviewPdf'
import TransactionForm from '../../components/TransactionForm'
import FullPageLoader from '../../components/layout/FullPageLoader'
import WideContainerDropZone from '../../components/layout/WideContainerDropZone'
import { BaseTransactionHookReturn } from './hooks'

interface IFormProps {
  onSave()
}

export default function TransactionsForm(props : BaseTransactionHookReturn & IFormProps) {
  const {
    loading,
    selectedLocation,
    selectedCategory,
    selectedReceiptFile,
    saving,
    save,
    onSave,
    setReceiptFile,
    ...formProps
  } = props

  const onHandleFileDrop = useCallback((files : Array<File>) => {
    setReceiptFile(files[0])
  }, [setReceiptFile])

  const onSumOrAcceptPress = useCallback(async () => {
    const saved = await save()
    if (saved) {
      onSave()
    }
  }, [onSave, save])

  if (loading) {
    return <FullPageLoader />
  }

  const isExpanded = !!selectedReceiptFile

  return (
    <WideContainerDropZone navbar onDrop={onHandleFileDrop}>
      <TransactionForm
        {...formProps}
        mode="date"
        onSumOrAcceptPress={onSumOrAcceptPress}
        category={selectedCategory}
        location={selectedLocation}
        expanded={isExpanded}>
        {selectedReceiptFile && <PreviewPdf fileUrl={selectedReceiptFile} />}
      </TransactionForm>
    </WideContainerDropZone>
  )
}
