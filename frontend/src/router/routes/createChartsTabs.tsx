import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { DefaultTheme } from 'styled-components/native'
import { RouteFactory } from './types'

import IeTab from '../../screens/Charts/IeTab'
import ExpensesTab from '../../screens/Charts/ExpenseTab'
import LoansTab from '../../screens/Charts/LoansTab'
import SavingsTab from '../../screens/Charts/SavingsTab'
import Icon from '../../components/Icon'
import TabBar from '../../components/TopTabBar'
import { Platform } from 'react-native'
import { getActiveChildNavigationOptions } from 'react-navigation'

const createChartsTabs : RouteFactory = ({ device } : DefaultTheme, i18n, isSignedIn: boolean) => {
  const onDesktop = device === 'desktop'

  const navigation = createMaterialTopTabNavigator({
    ie: {
      screen: IeTab,
      path: 'ie',
      navigationOptions: {
        title: i18n.t('pages.charts.tabs.ie.title'),
        tabBarIcon: ({ tintColor, ...props }) => <Icon {...props} size={24} color={tintColor} name="MaterialCommunityIcons:chart-line" />
      }
    },
    taxes: {
      screen: ExpensesTab,
      path: 'expenses',
      navigationOptions: {
        title: i18n.t('pages.charts.tabs.expenses.title'),
        tabBarIcon: ({ tintColor, ...props }) => <Icon {...props} size={24} color={tintColor} name="MaterialCommunityIcons:chart-bar-stacked" />
      }
    },
    loans: {
      screen: LoansTab,
      path: 'loans',
      navigationOptions: {
        title: i18n.t('pages.charts.tabs.loans.title'),
        tabBarIcon: ({ tintColor, ...props }) => <Icon {...props} size={24} color={tintColor} name="MaterialCommunityIcons:bank-transfer-in" />
      }
    },
    savings: {
      screen: SavingsTab,
      path: 'savings',
      navigationOptions: {
        title: i18n.t('pages.charts.tabs.savings.title'),
        tabBarIcon: ({ tintColor, ...props }) => <Icon {...props} size={24} color={tintColor} name="MaterialCommunityIcons:piggy-bank" />
      }
    }
  }, {
    lazy: true,
    swipeEnabled: Platform.OS != "web",
    tabBarPosition: 'top',
    tabBarComponent: TabBar,
    tabBarOptions: {
      showIcon: true,
      showLabel: onDesktop
    },
    style: {
      elevation: 0
    }
  })

  return navigation
}

export default createChartsTabs