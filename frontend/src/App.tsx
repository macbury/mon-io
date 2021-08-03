import React, { useMemo } from 'react'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { View, YellowBox } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { Portal } from 'react-native-paper'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import styled from 'styled-components/native'

import Router from './router/Router'
import BootApp from './BootApp'
import { StoreProvider, RootStore } from './stores'
import MonioApi from './api'
import ErrorBoundary from './components/ErrorBoundary'
import UpdateRequired from './components/UpdateRequired/index'
import HandleSharedFiles from './components/HandleSharedFiles'
import DevKeepAwakeScreen from './components/DevKeepAwakeScreen'
import Theme from './components/Theme'
import Sentry from './components/Sentry'
import TranslationsHandler from './components/TranslationsHandler'
import RefreshToken from './components/RefreshToken'
import Dialogs from './components/dialogs'

YellowBox.ignoreWarnings(['Require cycle:']) // meh, fuck them

const Container = styled(View)`
  flex: 1;
  height: 100%;
  display: flex;
  background: ${(props) => props.theme.windowBackground};
`

export default function MonioApp() {
  const store = useMemo(() => (new RootStore()), [])
  const monioApi = useMemo(() => (new MonioApi(store)), [store])

  return (
    <SafeAreaProvider>
      <ApolloProvider client={monioApi.client}>
        <StoreProvider store={store}>
          <Theme>
            <Container>
              <DevKeepAwakeScreen />
              <ErrorBoundary>
                <BootApp store={store} monioApi={monioApi}>
                  <UpdateRequired>
                    <RefreshToken />
                    <HandleSharedFiles />
                    <Sentry />
                    <TranslationsHandler>
                      <ActionSheetProvider>
                        <Portal.Host>
                          <Router />
                          <Dialogs />
                        </Portal.Host>
                      </ActionSheetProvider>
                    </TranslationsHandler>
                  </UpdateRequired>
                </BootApp>
              </ErrorBoundary>
            </Container>
          </Theme>
        </StoreProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  )
}