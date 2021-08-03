import { ThemeProps, DefaultTheme } from 'styled-components/native'
import { TransactionCategoryKind } from '../../api/graphql'

export type HeaderType = TransactionCategoryKind

function isExpense(type : TransactionCategoryKind) {
  return type === TransactionCategoryKind.Expense || type === TransactionCategoryKind.Tax
}

export function backgroundColorByType({ theme, type } : IStyleProps) {
  if (type === TransactionCategoryKind.Loan) {
    return theme.loanBackgroundColor
  } else if (type === TransactionCategoryKind.Deposit) {
    return theme.savingBackgroundColor
  } else if(isExpense(type)) {
    return theme.expenseBackgroundColor
  } else {
    return theme.incomeBackgroundColor
  }
}

export function textColorByType({ theme, type } : IStyleProps) {
  if (type === TransactionCategoryKind.Loan) {
    return theme.loanColor
  } else if (type === TransactionCategoryKind.Deposit) {
    return theme.savingColor
  } else if(isExpense(type)) {
    return theme.expenseColor
  } else {
    return theme.incomeColor
  }
}

export interface IStyleProps extends ThemeProps<DefaultTheme> {
  type: HeaderType
  value?: number
}
