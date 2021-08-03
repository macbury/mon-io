import React from 'react'
import { DefaultTheme } from 'styled-components/native'

import createStack from './createStack'
import createChartsTabs from '../createChartsTabs'
import AppHeader from '../../../components/layout/AppHeader'

export default function createChartsStack(theme : DefaultTheme, i18n, isSignedIn: boolean) {
  const onDesktop = theme.device === 'desktop'

  return createStack({
    charts: {
      screen: createChartsTabs(theme, i18n, isSignedIn),
      path: '',
      navigationOptions: {
        title: "pages.charts.title",
        header: (props) => onDesktop ? null : <AppHeader tabs title="pages.charts.title" {...props} />
      }
    }
  }, theme)
}