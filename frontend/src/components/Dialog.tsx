import React from 'react'
import { StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal, Button } from 'react-native-paper'
import styled from 'styled-components/native'

const Container = styled(Dialog)`
  max-width: 400px;
  min-width: 300px;
  margin: ${20 + (StatusBar.currentHeight || 0)}px 20px 20px 20px;
  display: flex;
  align-self: center;
  flex-shrink: 1;
`

const InnerScroll = styled.ScrollView`
  flex: 1;
  min-height: 400px;
  max-height: 480px;
`

const Actions = styled(Dialog.Actions)`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const ActionButton = styled(Button)`
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 15px;
  min-width: 80px;
`

export interface IDialogContainerProps {
  visible: boolean
  title?: string
  children: any

  onDismiss()
}

export default function DialogContainer({ visible, onDismiss, title, children } : IDialogContainerProps) {
  const { t } = useTranslation()

  return (
    <Portal>
      <Container visible={visible} onDismiss={onDismiss} dismissable>
        {title && <Dialog.Title>{t(title)}</Dialog.Title>}
        <InnerScroll>
          {children}
        </InnerScroll>

        <Actions>
          <ActionButton onPress={onDismiss}>{t('dialogs.close')}</ActionButton>
        </Actions>
      </Container>
    </Portal>
  )
}