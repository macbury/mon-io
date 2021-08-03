import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import { Appbar, TouchableRipple, Text } from 'react-native-paper'
import SidebarItem from './SidebarItem'
import { INavProps } from './types'
import NetworkProgressBar from '../UnstyledProgressBar/NetworkProgressBar'
import Icon from '../Icon'
import Items from '../Drawer/Items'
import { useStoreData } from '../../stores'

const Container = styled.View`
  flex-direction: row;
  flex: 1;
`

const TabsScroll = styled.ScrollView`
  flex: 1;
`

interface ISidebarProps {
  collapsed?: boolean
  theme?: DefaultTheme
}

const SidebarMenu = styled.View`
  background: ${(props : ISidebarProps) => props.theme.headerBackground};
  width: ${({ collapsed } : ISidebarProps) => collapsed ? '64px' : '256px'};
  border-right-color: ${({ theme }) => theme.headerBorderColor};
  border-right-width: 1px;
`

const TabContainer = styled.View`
  flex: 1;
  flex-direction: column;
`

const TopTabBar = styled(Appbar.Header)`
  background: ${(props) => props.theme.headerBackground};
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.headerBorderColor};
  padding: 0px 30px 0px 0px;
`

const ChildrenContainer = styled.View`
  flex: 1;
  display: flex;
`

const ProgressBar = styled(NetworkProgressBar)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  z-index: 2;
`

const Space = styled.View`
  flex: 1;
`

const LogoutButton = styled(TouchableRipple)`
  background: ${(props) => props.theme.windowBackground};
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.headerBorderColor};
`

const CollapseButton = styled(TouchableRipple)`
  background: ${(props) => props.theme.windowBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.headerBorderColor};
`

const ButtonInner = styled.View`
  min-height: 55px;
  padding: 13px 20px;
  align-items: center;
  flex-direction: row;
`

const ButtonText = styled(Text)`
  margin-left: 15px;
  opacity: 0.7;
  margin-top: 1px;
  font-size: 16px;
`

function useSidebar() {
  return useStoreData(({ screens: { sidebar }, session }) => ({
    collapsed: sidebar.collapsed,
    toggle: sidebar.toggle,
    signOut: session.signOut
  }))
}

export default function SidebarTabs({ children, descriptors, onTabPress, route } : INavProps) {
  const {
    collapsed,
    toggle,
    signOut
  } = useSidebar()

  const { t } = useTranslation()

  // @ts-ignore
  const tabs = useMemo(() => Object.values(descriptors).filter(({ options: { inTopMenu } }) => inTopMenu).map(({ key, options: { title, tabBarIcon }, state }) => ({ key, title, tabBarIcon, state })), [descriptors])
  // @ts-ignore
  const currentDescriptor = Object.values(descriptors).find(({ state }) => state === route)
  const items = tabs.map((item) => (
    <SidebarItem {...item} current={item.state === route} onTabPress={() => onTabPress(item.state)} />
  ))
  const theme = useTheme()

  const { options: { menu, inTopMenu, showTopTabs } } = currentDescriptor as any

  return (
    <Container>
      <SidebarMenu collapsed={collapsed}>
        <CollapseButton onPress={toggle}>
          <ButtonInner>
            <Icon
              name={collapsed ? "MaterialCommunityIcons:menu" : "MaterialCommunityIcons:backburger"}
              color={theme.colors.icon}
              size={24} />
            {!collapsed && <ButtonText>mon.io</ButtonText>}
          </ButtonInner>
        </CollapseButton>
        <TabsScroll>
          <Items
            collapsed={collapsed}
            selected={route.routeName} />
        </TabsScroll>
        <LogoutButton onPress={signOut}>
          <ButtonInner>
            <Icon
              name="MaterialCommunityIcons:power-standby"
              color={theme.colors.icon}
              size={24} />
            {!collapsed && <ButtonText>{t('pages.settings.options.session.logout')}</ButtonText>}
          </ButtonInner>
        </LogoutButton>
      </SidebarMenu>
      <TabContainer>
        {showTopTabs && <TopTabBar>
          {items}
          <Space />
          {menu && menu()}
          <ProgressBar />
        </TopTabBar>}
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
      </TabContainer>
    </Container>
  )
}