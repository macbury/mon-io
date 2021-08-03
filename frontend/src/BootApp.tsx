import React, { useEffect, useCallback, useState } from 'react'
import { useTheme } from 'styled-components/native'
import AnimatedSplash from 'react-native-animated-splash-screen'
import { RootStore } from '../src/stores'
import logger from './helpers/logger'
//import registerServiceWorker from './helpers/serviceWorker'
import MonioApi from './api'

const AppLogoUri = require('./assets/logo.png')
const log = logger('BootApp')

interface IBootApp {
  store : RootStore
  monioApi : MonioApi
  children: any
}

/**
 * Show logo ui while awaiting all stores to refresh
 */
export default function BootApp({ store, monioApi, children } : IBootApp) {
  const theme = useTheme()
  const [isReady, setReady] = useState(false)
  const runBoot = useCallback(async () => {
    log('Awaiting for store to boot up')

    try {
      const isSignedIn = await store.setup(monioApi)
      if (isSignedIn) {
        await store.loadCache()
        await store.refresh()
      }
      setReady(true)
    } catch (e) {
      log('Boot error', e)
    }

    setReady(true)
  }, [store, monioApi, setReady])

  useEffect(() => void runBoot(), [runBoot])

  return (
    <AnimatedSplash
      preload={false}
      translucent={true}
      isLoaded={isReady}
      logoImage={AppLogoUri}
      backgroundColor={theme.colors.background}
      logoHeight={150}
      logoWidth={150}>
      {children}
    </AnimatedSplash>
  )
}
