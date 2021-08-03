import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { KeyboardAvoidingView, StatusBar } from 'react-native'
import { Button } from 'react-native-paper'
import { NavigationInjectedProps } from 'react-navigation'
import { useFullScreenBar } from '../helpers/useSetNavBarColor'

import { useStoreData } from '../stores'
import guestRequired from '../hoc/guestRequired'
import { authPath } from '../helpers/urls'

const MainContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  margin-top: ${StatusBar.currentHeight}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  flex-direction: column;
  flex: 1;
  max-width: ${({ theme }) => theme.smallMaxWidth};
  width: 100%;
  padding: 0px 40px;
  margin: 0 auto;
`

function useSession() {
  return useStoreData(({ session }) => ({
    quickLogin: session.quickLogin,
    loading: session.isLoading,
    getEndpointUrlFromJwt: session.getEndpointUrlFromJwt
  }))
}

function QuickSignInScreen({ navigation } : NavigationInjectedProps) {
  const {
    quickLogin,
    loading,
    getEndpointUrlFromJwt
  } = useSession()

  useFullScreenBar()

  const tokenParam = navigation.getParam('token')

  useEffect(() => {
    if (tokenParam) {
      getEndpointUrlFromJwt(tokenParam)
      quickLogin(tokenParam)
    }
  }, [tokenParam])

  return (
    <MainContainer>
      <Container>
        <Button loading={loading} disabled={loading} mode="contained" onPress={() => navigation.navigate(authPath())}>
          Sign with username and password
        </Button>
      </Container>
    </MainContainer>
  );
}

export default guestRequired(QuickSignInScreen)