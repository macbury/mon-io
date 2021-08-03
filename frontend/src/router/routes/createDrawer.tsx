import React from 'react'
import { Platform } from 'react-native'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { DefaultTheme } from 'styled-components/native'

import Drawer from '../../components/Drawer'
import SignInScreen from '../../screens/SignInScreen'
import QuickSignInScreen from '../../screens/QuickSignInScreen'

function drawerLockMode(isSignedIn: boolean, onDesktop: boolean) {
  if (Platform.OS === "web") {
    return 'locked-closed'
  } else if (onDesktop) {
    return 'locked-closed'
  } else if (isSignedIn) {
    return 'unlocked'
  } else {
    return 'locked-closed'
  }
}

export default function createDrawer(signedInRoutes, theme : DefaultTheme, isSignedIn: boolean) {
  const onDesktop = theme.device === 'desktop'

  const routes = isSignedIn ? signedInRoutes : {}

  return createDrawerNavigator({
    ...routes,
    auth: SignInScreen,
    quickAuth: QuickSignInScreen
  }, {
    drawerBackgroundColor: theme.windowBackground,
    drawerType: 'front',
    unmountInactiveRoutes: true,
    initialRouteName: isSignedIn ? 'app' : 'auth',
    contentComponent: Drawer,
    drawerLockMode: 'locked-closed',
    defaultNavigationOptions: {
      drawerLockMode: drawerLockMode(isSignedIn, onDesktop)
    }
  })
}
