import React, { useCallback } from 'react'
import onAppStateActive from '../helpers/useAppState'
import { useStoreData } from '../stores'

export default function RefreshToken() {
  const { refreshToken } = useStoreData(({ session }) => ({
    refreshToken: session.refreshTokenIfNeeded
  }))

  onAppStateActive(refreshToken)

  return null
}