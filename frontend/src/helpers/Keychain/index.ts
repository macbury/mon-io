import AsyncStorage from '@react-native-community/async-storage'
import { AES, enc } from 'crypto-js'
import { Credentials, KEY_NAMESPACE } from './types'

const PSEUDO_SECURE_KEY = 'mYTKB1KpgjgLlQOMASHX4icPAmMhSpcI1pnQpqb9TkdF9WPVuW0P8h5C1J1x52qF'

/**
 * Save endpoint and token in localStorage and encrypt it with pseudo key
 * @param endpoint
 * @param token
 */
export async function saveEndpointAndPassword(credentials : Credentials) {
  const data = JSON.stringify(credentials)
  await AsyncStorage.setItem(KEY_NAMESPACE, AES.encrypt(data, PSEUDO_SECURE_KEY))
}

export async function loadEndpointAndPassword() : Promise<Credentials> {
  const data = await AsyncStorage.getItem(KEY_NAMESPACE)

  if (data) {
    const bytes = AES.decrypt(data, PSEUDO_SECURE_KEY)
    return JSON.parse(bytes.toString(enc.Utf8))
  } else {
    return {}
  }
}