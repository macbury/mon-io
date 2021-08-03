import React, { useMemo, useCallback } from 'react'
import Header from './Header'
import AddCategories from './AddCategories'
import CategoryBudgetItem from './CategoryBudget'
import { BudgetOption } from '../../stores/Screens/BudgetStore/Budget'
import { Category, TransactionCategoryKind, CategoryBudget } from '../../api/graphql'

interface IGroupProps {
  budgetId: string
  budgetOptions: BudgetOption[]
  all: CategoryBudget[]
  notBudgetedCategories: CategoryBudget[]
  type: TransactionCategoryKind

  onAddCategoryPress(category : Category, type: TransactionCategoryKind)
}

export default function BudgetGroup(props: IGroupProps) {
  const {
    budgetId,
    budgetOptions,
    all,
    notBudgetedCategories,
    type,
    onAddCategoryPress
  } = props

  const buildBudgetItem = useCallback((option : BudgetOption) => (
    <CategoryBudgetItem
      budgetId={budgetId}
      key={option.id}
      type={type}
      option={option} />
  ), [budgetId, type])

  const items = useMemo(() => (budgetOptions?.map(buildBudgetItem)), [budgetOptions, budgetId, buildBudgetItem])

  if (items.length === 0 && notBudgetedCategories.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <Header
        categories={all}
        type={type} />

      {items}

      <AddCategories
        type={type}
        onCategoryPress={onAddCategoryPress}
        categories={notBudgetedCategories} />
    </React.Fragment>
  )
}