import { TransactionCategoryKind, Money, CategoryBudget } from '../../../api/graphql'

export function onlySpending({ kind } : CategoryBudget) {
  return (
    kind === TransactionCategoryKind.Expense || kind === TransactionCategoryKind.Tax || kind === TransactionCategoryKind.Loan || kind === TransactionCategoryKind.Saving || kind === TransactionCategoryKind.Deposit
  )
}

export function onlyPlanned({ kind } : CategoryBudget) {
  return (
    kind === TransactionCategoryKind.Income || kind === TransactionCategoryKind.Withdraw
  )
}

export function onlyExpensesAndRest({ kind } : CategoryBudget) {
  return kind === TransactionCategoryKind.Expense || kind === TransactionCategoryKind.Tax || kind === TransactionCategoryKind.Loan || kind === TransactionCategoryKind.Deposit || kind === TransactionCategoryKind.Saving
}

export function onlyIncome({ kind } : CategoryBudget) {
  return kind === TransactionCategoryKind.Income
}

export function onlySavings({ kind } : CategoryBudget) {
  return kind === TransactionCategoryKind.Deposit || kind === TransactionCategoryKind.Withdraw
}

export function onlyExpenses({ kind } : CategoryBudget) {
  return kind === TransactionCategoryKind.Expense || kind === TransactionCategoryKind.Tax
}

export function onlyDeposit({ kind } : CategoryBudget) {
  return kind === TransactionCategoryKind.Deposit
}

export function onlyWithdraw({ kind } : CategoryBudget) {
  return kind === TransactionCategoryKind.Withdraw
}

export function onlyLoans({ kind } : CategoryBudget) {
  return kind === TransactionCategoryKind.Loan
}

export function sumMoney(prevMoney : Money, nextMoney : Money) : Money {
  return {
    ...prevMoney,
    cents: nextMoney.cents + prevMoney.cents
  }
}

export function subMoney(prevMoney : Money, nextMoney : Money) : Money {
  return {
    ...prevMoney,
    cents: prevMoney.cents - nextMoney.cents
  }
}