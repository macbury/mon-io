import React from 'react'
import { DefaultTheme } from 'styled-components/native'
import createStack from './createStack'

import NewImportScreen from '../../../screens/NewImportScreen'
import ImportsScreen from '../../../screens/ImportsScreen'

export default function createImportsStack(theme : DefaultTheme) {
  return createStack({
    imports: {
      screen: ImportsScreen,
      path: '',
      navigationOptions: {
        forceShowHeader: true
      }
    },
    newImport: {
      screen: NewImportScreen,
      path: ':importId/edit'
    },
  }, theme)
}