import React from 'react'
import { DefaultTheme } from 'styled-components/native'
import createStack from './createStack'

import SettingsScreen from '../../../screens/Settings'
import ApiExplorerScreen from '../../../screens/ApiExplorerScreen'
import QuickLoginScreen from '../../../screens/Settings/QuickLoginScreen'
import RefreshTokensScreen from '../../../screens/Settings/RefreshTokensScreen'
import DownloadMobileAppScreen from '../../../screens/Settings/DownloadMobileAppScreen'

export default function createSettingsStack(theme : DefaultTheme) {
  return createStack({
    settings: {
      screen: SettingsScreen,
      path: ''
    },
    apiExplorer: {
      screen: ApiExplorerScreen,
      path: 'access_tokens/:refreshTokenId'
    },
    settingsQuickLogin: {
      screen: QuickLoginScreen,
      path: 'quick_login'
    },
    settingsDownloadMobileApp: {
      screen: DownloadMobileAppScreen,
      path: 'download_mobile_app'
    },
    settingsRefreshTokens: {
      screen: RefreshTokensScreen,
      path: 'access_tokens'
    },
  }, theme)
}