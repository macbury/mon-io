import React from 'react'
import { DefaultTheme } from 'styled-components/native'

import createTabsSidebar from './createTabsSidebar'
import createDrawer from './createDrawer'
import createSeriesStack from './stacks/series'
import createCategoriesStack from './stacks/categories'
import createSettingsStack from './stacks/settings'
import createMapStack from './stacks/map'
import createImportsStack from './stacks/imports'
import createTransactionsStack from './stacks/transactions'
import createChartsStack from './stacks/charts'

export default function createRoutes(theme : DefaultTheme, i18n, isSignedIn: boolean) {
  const SidebarOrBottomNavigation = createTabsSidebar({
    transactions: {
      screen: createTransactionsStack(theme),
      path: 'transactions'
    },
    charts: {
      screen: createChartsStack(theme, i18n, isSignedIn),
      path: 'charts'
    },
    series: {
      screen: createSeriesStack(theme),
      path: 'series'
    },
    categories: {
      screen: createCategoriesStack(theme),
      path: 'categories'
    },
    imports: {
      screen: createImportsStack(theme),
      path: 'imports'
    },
    map: {
      screen: createMapStack(theme),
      path: 'map'
    },
    settings: {
      screen: createSettingsStack(theme),
      path: 'settings'
    }
  }, theme)

  return createDrawer({
    app: {
      screen: SidebarOrBottomNavigation,
      path: ''
    },
  }, theme, isSignedIn)
}