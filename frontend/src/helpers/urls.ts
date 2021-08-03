import { Recurrence } from './../api/graphql';
import moment, { Moment } from 'moment-timezone'
import { NavigationActions, NavigationNavigateAction } from 'react-navigation'
import { TransactionCategoryKind, RecurrenceUpdateMode } from '../api/graphql'

export function homePath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'home' })
}

export function receiptsPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'receipts' })
}

export function mapPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'map' })
}

export function authPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'auth' })
}

export function importsPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'imports' })
}

export function editImportPath(importId: string) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'newImport', params: { importId } })
}

export function settingsApiExplorerPath(refreshTokenId: string) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'apiExplorer', params: { refreshTokenId } })
}

export function categoriesPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'categories' })
}

export function newCategoryPath(kind: TransactionCategoryKind) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'newCategory', params: { kind } })
}

export function editCategoriesPath(categoryId: string) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'editCategory', params: { categoryId } })
}

export function scanPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'scan' })
}

export function changeNewTransactionCategoryPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'changeNewTransactionCategory' })
}

export function signInPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'auth' })
}

export function seriesPath(date?: Moment) : NavigationNavigateAction {
  const params = date ? { date: date.format('YYYY-MM-DD') } : {}
  return NavigationActions.navigate({ routeName: 'series', params })
}

export function chartsPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'charts' })
}

export function editSeriesPath(seriesId : string, updateType: RecurrenceUpdateMode, occuredAt?: Moment | string) : NavigationNavigateAction {
  let date = occuredAt ? moment(occuredAt).format('YYYY-MM-DD') : null
  return NavigationActions.navigate({ routeName: 'editSeries', params: { seriesId, date, updateType } })
}

export function editCategoryBudgetPath(budgetId : string, categoryId : string, kind: TransactionCategoryKind) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'editCategoryBudget', params: { budgetId, categoryId, kind } })
}

export function budgetPath(date : Moment) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'budget', params: { date: date.format('YYYY-MM') } })
}

export function summaryPath(date : Moment, type?: TransactionCategoryKind) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'summary', params: { date: date.format('YYYY-MM'), type } })
}

export function transactionsPath(date? : Moment, type?: TransactionCategoryKind, importId?: string) : NavigationNavigateAction {
  return NavigationActions.navigate({
    routeName: 'transactions',
    params: {
      date: date?.format('YYYY-MM'),
      type,
      importId
    }
  })
}

export function previewReceiptPath(receiptId : string) : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'preview', params: { receiptId } })
}

export function settingsPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'settings' })
}

export function settingsRefreshTokensPath() : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'settingsRefreshTokens' })
}

export function settingsAuthorizeDevicePath()  : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'settingsQuickLogin' })
}

export function settingsDownloadMobileAppPath()  : NavigationNavigateAction {
  return NavigationActions.navigate({ routeName: 'settingsDownloadMobileApp' })
}

export function newSummaryTransactionPath(categoryId: string, createdAt: string, kind: TransactionCategoryKind) {
  return NavigationActions.navigate({
    routeName: 'newSummaryTransaction',
    params: {
      categoryId, createdAt, kind
    }
  })
}

export function newBillTransactionPath(receiptId: string) {
  return NavigationActions.navigate({ routeName: 'newBillTransaction', params: { receiptId } })
}

export function newPlannedTransactionPath(seriesId: string, createdAt: string) {
  return NavigationActions.navigate({ routeName: 'newPlannedTransaction', params: { createdAt, seriesId } })
}

export function newSeriesPath(createdAt: string) {
  return NavigationActions.navigate({ routeName: 'newSeries', params: { createdAt, recurrence: Recurrence.Once } })
}

export function editSummaryTransactionPath(transactionId : string) {
  return NavigationActions.navigate({ routeName: 'editSummaryTransaction', params: { transactionId } })
}

export function editTransactionPath(transactionId : string) {
  return NavigationActions.navigate({ routeName: 'editTransaction', params: { transactionId } })
}