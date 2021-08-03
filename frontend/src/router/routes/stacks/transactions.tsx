import React from 'react'
import { DefaultTheme } from 'styled-components/native'
import createStack from './createStack'

import { TransactionCategoryKind } from '../../../api/graphql'
import TransactionsScreen from '../../../screens/TransactionsScreen'
import EditTransactionScreen from '../../../screens/Transactions/EditTransactionScreen'
import PreviewReceiptScreen from '../../../screens/PreviewReceiptScreen'
import EditSeriesScreen from '../../../screens/EditSeriesScreen'

export default function createTransactionsStack(theme : DefaultTheme) {
  return createStack({
    transactions: {
      screen: TransactionsScreen,
      path: '',
      params: {
        date: 'today',
        type: TransactionCategoryKind.ExpenseOrTax
      },
      navigationOptions: {
        forceShowHeader: true
      }
    },
    editTransaction: {
      screen: EditTransactionScreen,
      path: ':transactionId/edit'
    },
    preview: {
      screen: PreviewReceiptScreen,
      path: ':receiptId/preview'
    },
    editSeries: {
      screen: EditSeriesScreen,
      path: ':seriesId/repeating'
    }
  }, theme)
}