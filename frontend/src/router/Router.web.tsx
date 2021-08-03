import React, { useCallback } from 'react'
import { useTheme } from 'styled-components/native'
import { createBrowserApp } from '@react-navigation/web'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '../stores'
import createRoutes from './routes'

export default function Router(props) {
  const { isSignedIn } = useStoreData(({ session }) => ({
    isSignedIn: session.isSignedIn
  }))

  const theme = useTheme()
  const i18n = useTranslation()

  const updateDocumentTitle = useCallback((newTitleKey : string) => {
    if (newTitleKey) {
      document.title = `${i18n.t(newTitleKey)} - mon.io`
    } else {
      document.title = 'mon.io'
    }
  }, [i18n])

  const NavigationRouter = createBrowserApp(createRoutes(theme, i18n, isSignedIn), { updateDocumentTitle })

  return (
    <NavigationRouter {...props} />
  )
}