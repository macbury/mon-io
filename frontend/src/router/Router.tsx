import React from 'react'
import { createAppContainer } from 'react-navigation'
import { useTheme } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '../stores'
import createRoutes from './routes'

/**
 * App router with defined screens in config/routes.ts
 */

export default function Router(props) {
  const { isSignedIn } = useStoreData(({ session }) => ({
    isSignedIn: session.isSignedIn
  }))
  const theme = useTheme()
  const i18n = useTranslation()
  const NavigationRouter = createAppContainer(createRoutes(theme, i18n, isSignedIn))

  return <NavigationRouter {...props} />
}