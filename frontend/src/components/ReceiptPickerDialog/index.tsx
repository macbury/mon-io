import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Dialog, Portal } from 'react-native-paper'
import styled from 'styled-components/native'
import { useStoreData } from '../../stores'
import { Receipt } from '../../api/graphql'
import DialogContainer from '../DialogContainer'
import List from './List'

const Loader = styled.ActivityIndicator`
  margin: 60px auto;
`

const Container = styled(DialogContainer)`
  margin-left: ${({ theme }) => theme.device === "desktop" ? 'auto' : '20px'};
  margin-right: ${({ theme }) => theme.device === "desktop" ? 'auto' : '20px'};
  max-width: 900px;
  min-width: 300px;
  align-self: center;
`

const ListContainer = styled(Dialog.ScrollArea)`
  min-height: 300px;
  padding-left: 0px;
  padding-right: 0px;
  max-height: 400px;
  min-width: 300px;
`

const ActionButton = styled(Button)`
  margin-right: 10px;
  margin-bottom: 10px;
  min-width: 80px;
`

function useReceiptPickerDialogStore() {
  return useStoreData(({ ui: { receiptPicker } }) => ({
    visible: receiptPicker.visible,
    loading: receiptPicker.isLoading,
    refreshing: receiptPicker.isRefreshing,
    receipts: receiptPicker.receipts,
    respondWith: receiptPicker.respondWith
  }))
}

export default function ReceiptPickerDialog() {
  const { t } = useTranslation()

  const {
    visible,
    loading,
    receipts,
    respondWith
  } = useReceiptPickerDialogStore()

  const cancel = useCallback(() => {
    respondWith(null)
  }, [respondWith])

  const confirm = useCallback((receipt : Receipt) => {
    respondWith(receipt)
  }, [respondWith])

  return (
    <Portal>
      <Container visible={visible} onDismiss={cancel}>
        <Dialog.Title>{t('dialogs.receipts_picker.title')}</Dialog.Title>
        <ListContainer>
          {loading && <Loader size={90} color="#fff" />}
          <List
            receipts={receipts}
            onSelectReceipt={confirm} />
        </ListContainer>
        <Dialog.Actions>
          <ActionButton onPress={cancel}>{t('dialogs.cancel')}</ActionButton>
        </Dialog.Actions>
      </Container>
    </Portal>
  )
}