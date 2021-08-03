import React from 'react'
import { DefaultTheme } from 'styled-components/native'
import createStack from './createStack'

import CategoriesScreen from '../../../screens/CategoriesScreen'
import EditCategoryScreen from '../../../screens/EditCategoryScreen'
import NewCategoryScreen from '../../../screens/NewCategoryScreen'

export default function createCategoriesStack(theme : DefaultTheme) {
  return createStack({
    categories: {
      screen: CategoriesScreen,
      path: '',
      navigationOptions: {
        forceShowHeader: true
      }
    },
    newCategory: {
      screen: NewCategoryScreen,
      path: 'new/:kind'
    },
    editCategory: {
      screen: EditCategoryScreen,
      path: 'edit/:categoryId'
    },
  }, theme)
}