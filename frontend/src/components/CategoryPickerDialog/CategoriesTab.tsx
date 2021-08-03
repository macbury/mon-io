import React, { useCallback } from 'react'
import { useTheme } from 'styled-components/native'
import CategorySelectGrid from '../CategorySelectGrid'
import useCategories from './useCategories'

import { TransactionCategoryKind, Category } from '../../api/graphql'

export interface ICategoriesTabProps {
  categories: Category[]
  kind: TransactionCategoryKind
}

function CategoriesTab({ categories, kind } : ICategoriesTabProps) {
  const { selectedCategory, success } = useCategories()
  const { device } = useTheme()

  const onSelectCategory = useCallback((category) => {
    success(category, kind)
  }, [kind, success])

  return (
    <CategorySelectGrid
      numOfColumns={device === "desktop" ? 5 : 3}
      categories={categories}
      onSelectCategory={onSelectCategory}
      selectedCategory={selectedCategory} />
  )
}

export function ExpensesKindTab() {
  const { expenses } = useCategories()

  return (
    <CategoriesTab
      kind={TransactionCategoryKind.Expense}
      categories={expenses} />
  )
}

export function SavingsKindTab() {
  const { savings } = useCategories()

  return (
    <CategoriesTab
      kind={null}
      categories={savings} />
  )
}

export function LoansKindTab() {
  const { loans } = useCategories()

  return (
    <CategoriesTab
      kind={TransactionCategoryKind.Loan}
      categories={loans} />
  )
}


export function IncomeKindTab() {
  const { income } = useCategories()

  return (
    <CategoriesTab
      kind={TransactionCategoryKind.Income}
      categories={income} />
  )
}

export function WithdrawKindTab() {
  const { savings } = useCategories()

  return (
    <CategoriesTab
      kind={TransactionCategoryKind.Withdraw}
      categories={savings} />
  )
}

export function DepositKindTab() {
  const { savings } = useCategories()

  return (
    <CategoriesTab
      kind={TransactionCategoryKind.Deposit}
      categories={savings} />
  )
}