import React from 'react'
import styled from 'styled-components/native'
import { Dialog, Button, TextInput, Portal } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import DialogContainer from './DialogContainer'

import { useStoreData } from '../stores'

const Window = styled(DialogContainer)`
  width: ${({ theme }) => theme.device === "desktop" ? '700px' : '95%'};
  display: flex;
  align-self: center;
  flex-shrink: 1;
`

const ActionButton = styled(Button)`
  margin-right: 10px;
  min-width: 80px;
`

const Actions = styled(Dialog.Actions)`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

function useInputDialog() {
  return useStoreData(({ ui: { inputDialog } }) => ({
    titleKey: inputDialog.titleKey,
    value: inputDialog.value,
    visible: inputDialog.visible,

    setValue: inputDialog.setValue,
    ok: inputDialog.ok,
    dismiss: inputDialog.dismiss
  }))
}

export default function InputDialog() {
  const { t } = useTranslation()
  const {
    titleKey,
    visible,
    value,

    setValue,
    dismiss,
    ok
  } = useInputDialog()

  return (
    <Portal>
      <Window visible={visible} onDismiss={dismiss}>
        <Dialog.Title>{t(titleKey)}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoFocus
            mode="outlined"
            value={value}
            onSubmitEditing={ok}
            onChangeText={setValue} />
        </Dialog.Content>
        <Actions>
          <ActionButton onPress={dismiss}>{t('pages.refresh_token.long_lived_access_tokens.dialog.cancel')}</ActionButton>
          <ActionButton mode="contained" onPress={ok}>{t('pages.refresh_token.long_lived_access_tokens.dialog.ok')}</ActionButton>
        </Actions>
      </Window>
    </Portal>
  )
}