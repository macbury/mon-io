import React from 'react'
import { NavigationActions } from 'react-navigation'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import Link from '../Link'

interface IButtonInnerProps {
  current: boolean
}

const Container = styled(Link)<IButtonInnerProps>`
  display: flex;
  justify-content: center;
  padding-top: 3px;
  height: 56px;
  padding-bottom: ${({ current }) => current ? 0 : 3};
  border-bottom-width: ${({ current }) => current ? 3 : 0};
  border-bottom-color: ${(props) => props.theme.headerItemBottomColor};
`

const ButtonInner = styled.View<IButtonInnerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ current }) => current ? 1.0 : 0.6};
  padding: 0px 20px;
`

const ButtonText = styled(Text)`
  margin-left: 5px;
  font-size: 16px;
`

interface ISidebarItem {
  title: string
  current: boolean
  tabBarIcon: ({ tintColor, size } : { tintColor : string, size : number }) => any
  onTabPress: () => any
  state: any
}

export default function SidebarItem(props: ISidebarItem) {
  const { title, onTabPress, current, state }  = props
  const action = NavigationActions.navigate({ routeName: state.routeName })
  const { t } = useTranslation()

  return (
    <Container action={action} ripple onLongPress={onTabPress} current={current}>
      <ButtonInner current={current}>
        <ButtonText>{t(title)}</ButtonText>
      </ButtonInner>
    </Container>
  )
}
