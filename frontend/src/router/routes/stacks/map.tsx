import React from 'react'
import { DefaultTheme } from 'styled-components/native'
import createStack from './createStack'
import MapScreen from '../../../screens/MapScreen'

export default function createMapStack(theme : DefaultTheme) {
  return createStack({
    map: {
      screen: MapScreen,
      path: '',
      navigationOptions: {
        forceShowHeader: true
      }
    },
  }, theme)
}