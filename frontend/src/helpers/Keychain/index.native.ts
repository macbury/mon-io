import * as Keychain from 'react-native-keychain'
import { Credentials } from './types'

export async function saveEndpointAndPassword({ endpoint, refreshToken, accessToken } : Credentials) {
  await Keychain.resetGenericPassword()
  if (endpoint && refreshToken) {
    await Keychain.setGenericPassword(endpoint, JSON.stringify({ refreshToken, accessToken }))
  }
}

export async function loadEndpointAndPassword() : Promise<Credentials> {
  const data = await Keychain.getGenericPassword()

  if (data) {
    const { refreshToken, accessToken } = JSON.parse(data.password)
    return {
      endpoint: data.username,
      refreshToken,
      accessToken
    }
  } else {
    return {}
  }
}