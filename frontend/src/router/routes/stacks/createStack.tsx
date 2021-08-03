import React from 'react'
import { DefaultTheme } from 'styled-components/native'
import { createStackNavigator } from 'react-navigation-stack'
import { getActiveChildNavigationOptions } from 'react-navigation'
import AppHeader from '../../../components/layout/AppHeader'

export default function createStack(routes, theme : DefaultTheme, defaultOptions = {}) {
  const stack = createStackNavigator(routes, {
    mode: 'modal',
    cardStyle: {
      height: '100%',
      flex: 1,
      backgroundColor: theme.windowBackground
    },

    defaultNavigationOptions: {
      ...defaultOptions,
      title: "monio",
      // @ts-ignore
      header: (props) => <AppHeader {...props} />
    }
  })

  stack.navigationOptions = ({ navigation, screenProps, navigationOptions }) => {
    const childNavOpts = getActiveChildNavigationOptions(navigation, screenProps)
    let { drawerLockMode, header } = childNavOpts

    drawerLockMode = drawerLockMode ? drawerLockMode : 'locked-closed'

    if (!header) {
      header = (props) => <AppHeader topLevel {...props} />
    }

    return {
      ...navigationOptions,
      ...childNavOpts,
      drawerLockMode,
      header
    }
  }

  return stack
}