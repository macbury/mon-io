import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import styled from 'styled-components/native'
import { useStoreData } from '../../stores'
import DialogContainer from '../DialogContainer'

const Container = styled(DialogContainer)`
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  min-width: 320px;
  align-self: center;
`

const ActionButton = styled(Button)`
  margin-left: 10px;
  min-width: 90px;
`

const Actions = styled(Dialog.Actions)`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
`

function useConfirmDialogStore() {
  return useStoreData(({ ui: { confirm } }) => ({
    titleKey: confirm.titleKey,
    messageKey: confirm.messageKey,
    respondWith: confirm.respondWith,
    visible: confirm.visible
  }))
}

export default function ConfirmDialog() {
  const { t } = useTranslation()

  const {
    titleKey,
    messageKey,
    respondWith,
    visible
  } = useConfirmDialogStore()

  const cancel = useCallback(() => {
    respondWith(false)
  }, [respondWith])

  const confirm = useCallback(() => {
    respondWith(true)
  }, [respondWith])

  return (
    <Portal>
      <Container visible={visible} onDismiss={cancel}>
        <Dialog.Title>{t(titleKey)}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{t(messageKey)}</Paragraph>
        </Dialog.Content>
        <Actions>
          <ActionButton mode="contained" onPress={confirm}>{t('dialogs.confirm')}</ActionButton>
          <ActionButton onPress={cancel}>{t('dialogs.cancel')}</ActionButton>
        </Actions>
      </Container>
    </Portal>
  )
}