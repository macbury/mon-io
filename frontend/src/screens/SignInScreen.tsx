import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Platform, StatusBar } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper'
import { NavigationInjectedProps, ScrollView } from 'react-navigation'
import WideContainer from '../components/layout/WideContainer'
import { useStoreData } from '../stores'
import guestRequired from '../hoc/guestRequired'
import KeyboardShift from '../components/KeyboardShift'
import BigButton from '../components/BigButton'
import { homePath } from '../helpers/urls'
import { useFullScreenBar } from '../helpers/useSetNavBarColor'

const logoUri = require('../assets/logo.png')

const Logo = styled.Image`
  width: 128px;
  height: 128px;
  margin: 20px auto;
  transform: rotate(10deg);
`

const MainContainer = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  margin-top: ${StatusBar.currentHeight}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Container = styled(ScrollView)`
  flex-direction: column;
  flex: 1;
  max-width: 600px;
  width: 100%;
  padding: 10px 25px;
  margin: 0 auto;
`

const InputsContainer = styled.KeyboardAvoidingView`
  margin-bottom: 20px;
`

const InputDivider = styled(View)`
  height: 15px;
`

function useSession() {
  return useStoreData(({ session }) => ({
    session
  }))
}

function SignInScreen({ navigation } : NavigationInjectedProps) {
  const [endpointUrl, setEndpointUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const { session } = useSession()

  async function onSignInPress() {
    setLoading(true)
    session.changeEndpoint(endpointUrl)

    const errors : any = await session.signIn(
      username,
      password
    )

    setLoading(false)

    if (errors.length === 0) {
      navigation.navigate(homePath())
    }
  }

  useFullScreenBar()

  return (
    <WideContainer>
      <KeyboardShift>
        <MainContainer>
          <Container>
            <InputsContainer enabled behavior="padding" keyboardVerticalOffset={50}>
              <Logo source={logoUri} />
              {
                Platform.OS !== 'web' &&
                <TextInput label="Endpoint URL"
                  placeholder="https://my-instance.com/api"
                  value={endpointUrl}
                  disabled={loading}
                  autoFocus
                  autoCapitalize="none"
                  onSubmitEditing={onSignInPress}
                  onChangeText={setEndpointUrl} />
              }
              { Platform.OS !== 'web' && <InputDivider /> }
              <TextInput label="Username"
                value={username}
                disabled={loading}
                autoCapitalize="none"
                onSubmitEditing={onSignInPress}
                onChangeText={setUsername}/>
              <InputDivider />
              <TextInput label="Password"
                value={password}
                disabled={loading}
                autoCapitalize="none"
                secureTextEntry
                onSubmitEditing={onSignInPress}
                onChangeText={setPassword}/>
            </InputsContainer>

            <BigButton disabled={loading} onPress={onSignInPress} title="Sign in" />
          </Container>
        </MainContainer>
      </KeyboardShift>
    </WideContainer>
  );
}

export default guestRequired(SignInScreen)