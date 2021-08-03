import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal, List } from 'react-native-paper'
import styled from 'styled-components/native'

const Container = styled(Dialog)`
  max-width: 400px;
  min-width: 300px;
  display: flex;
  align-self: center;
  flex-shrink: 1;
  margin-top: 20px;
  margin-bottom: 20px;
`

const InnerContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const Icon = styled(List.Icon)`
`

export interface IAction {
  title: string
  subtitle?: string
  icon: string
  hidden?: boolean
  onPress()
}

export interface IActionDialogProps {
  visible: boolean
  title: string
  items: IAction[]
  onDismiss()
}

export default function ActionDialog({ visible, onDismiss, title, items } : IActionDialogProps) {
  const { t } = useTranslation()

  const list = items.filter(({ hidden }) => !hidden).map(({ title, subtitle, icon, onPress }) => {
    return (
      <List.Item
        key={title}
        title={title}
        description={subtitle}
        onPress={onPress}
        left={props => <Icon icon={icon} />} />
    )
  })

  return (
    <Portal>
      <Container visible={visible} onDismiss={onDismiss} dismissable>
        <Dialog.Title>{title}</Dialog.Title>
        <InnerContainer>
          {list}
          <List.Item
            title={t('dialogs.budget_actions.actions.done')}
            onPress={onDismiss}
            left={props => <Icon icon="check-circle" />} />
        </InnerContainer>
      </Container>
    </Portal>
  )
}