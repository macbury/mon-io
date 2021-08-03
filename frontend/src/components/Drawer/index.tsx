import React from 'react'
import SafeAreaView from 'react-native-safe-area-view'
import { Text } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { DrawerContentComponentProps } from 'react-navigation-drawer'

import styled, { useTheme } from 'styled-components/native'

import { useStoreData } from '../../stores'
import AccountContainer from './AccountContainer'
import CloseButton from './CloseButton'
import Item from './Item'
import Items from './Items'

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`

const Container = styled.View`
  background: ${(props) => props.theme.windowBackground};
  flex: 1;
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

const VersionContainer = styled.View`
  border-bottom-color: ${({ theme }) => theme.itemBorderColor};
  border-bottom-width: 1px;
  border-top-color: ${({ theme }) => theme.itemBorderColor};
  border-top-width: 1px;
  align-items: center;
  padding: 10px 0;
`

const VersionText = styled(Text)`
  opacity: 0.3;
`

const InnerScroll = styled(ScrollView)`
  flex: 1;
`

function useSessionData() {
  return useStoreData(({ session, settings, about }) => ({
    isSignedIn: session.isSignedIn,
    username: settings.username,
    avatarUrl: settings.avatarUrl,
    version: about.clientVersion,
    endpointUrl: session.endpointUrl,
    logout: session.signOut
  }))
}

export default function Drawer({ navigation: { state: { isDrawerOpen } }, ...props } : DrawerContentComponentProps) {
  const {
    isSignedIn,
    username,
    version,
    endpointUrl,
    avatarUrl,
    logout
  } = useSessionData()

  const { device } = useTheme()

  if (!isSignedIn) {
    return null
  }

  return (
    <React.Fragment>
      {isDrawerOpen && <CloseButton />}
      <Container>
        <SafeArea forceInset={{ top: 'always', horizontal: 'never' }} >
          <AccountContainer
            avatarUrl={avatarUrl}
            backendUrl={endpointUrl}
            username={username} />

          <InnerScroll>
            <Items collapsed={false} />
          </InnerScroll>
          <VersionContainer>
            <VersionText>Current version: {version}</VersionText>
          </VersionContainer>
          <Item
            titleKey="pages.settings.options.session.logout"
            onPress={logout}
            icon="power-standby"
          />
        </SafeArea>
      </Container>
    </React.Fragment>
  )
}