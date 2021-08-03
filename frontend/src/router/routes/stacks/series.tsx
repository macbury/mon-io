import React from 'react'
import { DefaultTheme } from 'styled-components/native'
import createStack from './createStack'

import SeriesScreen from '../../../screens/SeriesScreen'
import EditTransactionScreen from '../../../screens/Transactions/EditTransactionScreen'
import EditSeriesScreen from '../../../screens/EditSeriesScreen'
import PreviewReceiptScreen from '../../../screens/PreviewReceiptScreen'
import NewTransactionScreen from '../../../screens/Transactions/NewTransactionScreen'

export default function createSeriesStack(theme : DefaultTheme) {
  return createStack({
    series: {
      screen: SeriesScreen,
      path: ':date',
      params: {
        date: 'today'
      },
      navigationOptions: {
        forceShowHeader: true
      }
    },
    editSeries: {
      screen: EditSeriesScreen,
      path: ':date/:seriesId/edit/:updateType'
    },
    newPlannedTransaction: {
      screen: NewTransactionScreen,
      path: 'plan/:seriesId'
    },
    newSeries: {
      screen: NewTransactionScreen,
      path: ':recurrence/:createdAt/new'
    },
    editTransaction: {
      screen: EditTransactionScreen,
      path: ':transactionId/transaction'
    },
    preview: {
      screen: PreviewReceiptScreen,
      path: ':receiptId/preview'
    },
  }, theme)
}