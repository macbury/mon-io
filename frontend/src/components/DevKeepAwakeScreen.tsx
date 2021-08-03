import React from 'react'
import KeepAwake from 'react-native-keep-awake'

/**
 * prevent screen switching off in dev mode
 */
export default function DevKeepAwakeScreen() {
  if (process.env.NODE_ENV == 'development') {
    return <KeepAwake />
  }
  return null
}