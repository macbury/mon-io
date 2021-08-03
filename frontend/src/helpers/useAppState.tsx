import React, { useEffect, useCallback } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export default function useAppStateActive(callback : () => void) {
  const onStateChanged = useCallback((state : AppStateStatus) => {
    if (state === 'active') {
      callback()
    }
  }, [callback])

  useEffect(() => {
    AppState.addEventListener('change', onStateChanged)
    onStateChanged('active')
    return () => {
      AppState.removeEventListener('change', onStateChanged)
    }
  }, [onStateChanged])
}