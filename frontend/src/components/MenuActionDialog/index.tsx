import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal, List } from 'react-native-paper'
import styled, { useTheme } from 'styled-components/native'
import { useStoreData } from '../../stores'

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

function useMenuActionStore() {
  return useStoreData(({ ui: { menuAction } }) => ({
    visible: menuAction.visible,
    items: menuAction.items || [],
    titleKey: menuAction.titleKey,

    cancel: menuAction.cancel
  }))
}

export default function MenuActionDialog() {
  const { t } = useTranslation()
  const {
    visible,
    items,
    titleKey,

    cancel
  } = useMenuActionStore()

  const list = items.map(({ title, icon, onPress }) => {
    return (
      <List.Item
        key={title}
        title={t(title)}
        onPress={() => {
          cancel()
          onPress()
        }}
        left={props => <List.Icon icon={icon} />}
      />
    )
  })

  return (
    <Portal>
      <Container visible={visible} onDismiss={cancel} dismissable>
        <Dialog.Title>{t(titleKey)}</Dialog.Title>
        <InnerContainer>
          {list}
        </InnerContainer>
      </Container>
    </Portal>
  )
}