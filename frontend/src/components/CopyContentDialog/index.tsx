import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal, Button, Paragraph, TextInput } from 'react-native-paper'
import styled from 'styled-components/native'
import CopyButton from './CopyButton'
import { useStoreData } from '../../stores'

const Container = styled(Dialog)`
  display: flex;
  align-self: center;
  flex-shrink: 1;
  flex-grow: 0;
`

const Actions = styled(Dialog.Actions)`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const DialogContent = styled(Dialog.Content)`
  flex-grow: 0;
  flex-shrink: 1;
  max-height: 300px;
`

const CancelButton = styled(Button)`
  margin-left: 10px;
  min-width: 80px;
`

const TokenTextField = styled(TextInput)`
  padding: 10px 0px;
`

function useCopyContent() {
  return useStoreData(({ ui: { copyContent } }) => ({
    visible: copyContent.visible,
    titleKey: copyContent.titleKey,
    messageKey: copyContent.messageKey,
    content: copyContent.content,

    close: copyContent.close
  }))
}

export default function CopyContentDialog() {
  const { t } = useTranslation()
  const {
    titleKey,
    messageKey,
    visible,
    content,
    close
  } = useCopyContent()

  return (
    <Portal>
      <Container visible={visible} onDismiss={close}>
        <Dialog.Title>{t(titleKey)}</Dialog.Title>
        <DialogContent>
          <Paragraph>
            {t(messageKey)}
          </Paragraph>

          <TokenTextField
            mode='outlined'
            multiline={true}
            numberOfLines={4}
            editable={false}
            value={content} />
        </DialogContent>

        <Actions>
          <CopyButton content={content} />
          <CancelButton onPress={close}>{t('dialogs.share_calendar.close')}</CancelButton>
        </Actions>
      </Container>
    </Portal>
  )
}
