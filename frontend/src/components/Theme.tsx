import React, { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useWindowDimensions } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { useSafeAreaInsets } from "react-native-safe-area-context"

import logger from '../helpers/logger'
import useColorScheme from '../helpers/useColorScheme'
import GlobalStyle from './layout/GlobalStyle'
import { lightTheme, darkTheme } from '../config/theme'
import { Device, MonioTheme } from '../config/types'
import { useStoreData } from '../stores'

const log = logger('Theme')

export interface IThemeProps {
  children: any
}

function useSettingsStore() {
  return useStoreData(({ settings }) => ({
    themeMode: settings.themeMode
  }))
}

export default function Theme({ children } : IThemeProps) {
  const isDesktop = useMediaQuery({ minWidth: 1000 })
  const isLandscape = useMediaQuery({ query: '(orientation: landscape)' })

  const { themeMode } = useSettingsStore()
  const colorScheme = useColorScheme()
  const insets = useSafeAreaInsets()

  const currentTheme = useMemo(() => {
    const themes = {
      'light': lightTheme,
      'dark': darkTheme
    }

    const theme = themes[themeMode] || themes[colorScheme] || darkTheme
    log(`themeMode: ${themeMode} colorScheme: ${colorScheme}`)

    return {
      ...theme,
      insets,
      device: isDesktop ? 'desktop' : 'mobile' as Device,
      orientation: isLandscape ? 'landscape' : 'portrait'
    } as MonioTheme
  }, [isDesktop, themeMode, colorScheme, isLandscape])

  return (
    <PaperProvider theme={currentTheme}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle theme={currentTheme} />
        {children}
      </ThemeProvider>
    </PaperProvider>
  )
}