import React from 'react'
import {
  getActiveChildNavigationOptions,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation'

import tabBarIcon from '../../hoc/tabBarIcon'
import AppHeader from '../../components/layout/AppHeader'
import { TransactionCategoryKind } from '../../api/graphql'
import SummaryScreen from '../../screens/SummaryScreen'
import BudgetScreen from '../../screens/BudgetScreen'
import EditCategoryBudgetScreen from '../../screens/EditCategoryBudgetScreen'
import ReceiptsScreen from '../../screens/ReceiptsScreen'
import ScanDocumentScreen from '../../screens/ScanDocumentScreen'
import PreviewReceiptScreen from '../../screens/PreviewReceiptScreen'
import NewTransactionScreen from '../../screens/Transactions/NewTransactionScreen'
import EditTransactionScreen from '../../screens/Transactions/EditTransactionScreen'
import EditSeriesScreen from '../../screens/EditSeriesScreen'

import createTabsSidebarNavigator from '../../components/TabSidebarNavigator'

import createStack from './stacks/createStack'

export default function createTabsSidebar(routes = {}, theme) {
  const BudgetStack = createStack({
    budget: {
      screen: BudgetScreen,
      path: ':date',
      params: {
        date: 'today'
      },
      navigationOptions: {
        showTopTabs: true,
        inTopMenu: true,
        inTabBar: true,
        tabBarIcon: tabBarIcon('chart-bar-stacked'),
      }
    },
    editCategoryBudget: {
      screen: EditCategoryBudgetScreen,
      path: ':budgetId/:kind/:categoryId/edit'
    },
  }, theme, {
    initialRouteName: 'budget',
    inTopMenu: true,
    inTabBar: false,
    showTopTabs: false,
  })

  const SummaryStack = createStack({
    summary: {
      screen: SummaryScreen,
      path: ':date/:type',
      params: {
        date: 'today',
        type: TransactionCategoryKind.ExpenseOrTax
      },
      navigationOptions: {
        tabBarIcon: tabBarIcon('chart-arc'),
        showTopTabs: true,
        inTopMenu: true,
        inTabBar: true,
      }
    },
    editSummaryTransaction: {
      screen: EditTransactionScreen,
      path: 'transaction/:transactionId/edit'
    },
    preview: {
      screen: PreviewReceiptScreen,
      path: 'bill/:receiptId/preview'
    },
    newSummaryTransaction: {
      screen: NewTransactionScreen,
      path: 'transaction/:categoryId/:kind/new'
    },
    editSeries: {
      screen: EditSeriesScreen,
      path: 'transaction/:seriesId/:date/:updateType/repeating'
    }
  }, theme, {
    inTopMenu: true,
    showTopTabs: false,
    inTabBar: false,
  })

  const ReceiptsStack = createStack({
    all: {
      screen: ReceiptsScreen,
      path: '',
      navigationOptions: {
        tabBarIcon: tabBarIcon('attachment'),
        showTopTabs: true,
        inTopMenu: true,
        inTabBar: true,
      }
    },
    scan: {
      screen: ScanDocumentScreen,
      path: 'scan'
    },
    preview: {
      screen: PreviewReceiptScreen,
      path: 'preview/:receiptId'
    },
    newBillTransaction: {
      screen: NewTransactionScreen,
      path: 'register/:receiptId'
    },
    newPlannedTransaction: {
      screen: NewTransactionScreen,
      path: 'plan/:seriesId/:createdAt'
    }
  }, theme, {
    initialRouteName: 'receipts',
    inTopMenu: true,
    showTopTabs: false,
    inTabBar: false,
  })

  const navigation = createTabsSidebarNavigator({
    budget: {
      screen: BudgetStack,
      path: 'budget'
    },
    summary: {
      screen: SummaryStack,
      path: 'summary'
    },
    receipts: {
      screen: ReceiptsStack,
      path: 'bills'
    },
    ...routes
  }, {
    initialRouteName: 'receipts',
    shifting: true
  })

  /**
   * Set stack title by fetching it from bottom navigator
   */
  navigation.navigationOptions = ({ navigation, screenProps } : {
    navigation: NavigationScreenProp<NavigationState>;
    screenProps: { [key: string]: any };
  }) => {
    let { title, header, menu } = getActiveChildNavigationOptions(navigation, screenProps)
    if (!header) {
      header = (props) => <AppHeader topLevel {...props} />
    }
    return { title, header, menu } // set header null for  web desktop
  }

  return navigation
}
