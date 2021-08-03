import React from 'react'
import { BudgetOption } from '../../stores/Screens/BudgetStore/Budget'
import { Category, CategoryBudget, TransactionCategoryKind, Money } from '../../api/graphql'
import BudgetGroup from './BudgetGroup'
import { Column, Container, SummaryAndCategories } from './Containers'

interface IBudgetProps {
  budgetId: string
  refreshing: boolean
  children: any
  allWithdraws: CategoryBudget[]
  allDeposits: CategoryBudget[]
  allIncomes: CategoryBudget[]
  allExpenses: CategoryBudget[]
  allLoans: CategoryBudget[]
  depositBudgetCategories: BudgetOption[]
  withdrawBudgetCategories: BudgetOption[]
  loansBudgetCategories: BudgetOption[]
  expensesBudgetCategories: BudgetOption[]
  incomeBudgetCategories: BudgetOption[]
  expenseCategories: CategoryBudget[]
  incomeCategories: CategoryBudget[]
  depositCategories: CategoryBudget[]
  withdrawCategories: CategoryBudget[]
  loansCategories: CategoryBudget[]

  onRefresh()
  onAddCategoryPress(category : Category, type: TransactionCategoryKind)
}

export default function BudgetList(props : IBudgetProps) {
  const {
    onAddCategoryPress,
    budgetId,
    withdrawCategories,
    depositCategories,
    expenseCategories,
    incomeCategories,
    expensesBudgetCategories,
    incomeBudgetCategories,
    loansBudgetCategories,
    depositBudgetCategories,
    withdrawBudgetCategories,
    loansCategories,
    allIncomes,
    allExpenses,
    allLoans,
    allDeposits,
    allWithdraws,
    children
  } = props

  return (
    <SummaryAndCategories>
      <Container>
        <Column>
          <BudgetGroup
            type={TransactionCategoryKind.Expense}
            all={allExpenses}
            budgetId={budgetId}
            budgetOptions={expensesBudgetCategories}
            notBudgetedCategories={expenseCategories}
            onAddCategoryPress={onAddCategoryPress}
          />

          <BudgetGroup
            type={TransactionCategoryKind.Loan}
            all={allLoans}
            budgetId={budgetId}
            budgetOptions={loansBudgetCategories}
            notBudgetedCategories={loansCategories}
            onAddCategoryPress={onAddCategoryPress}
          />
        </Column>

        <Column border>
          <BudgetGroup
            type={TransactionCategoryKind.Income}
            all={allIncomes}
            budgetId={budgetId}
            budgetOptions={incomeBudgetCategories}
            notBudgetedCategories={incomeCategories}
            onAddCategoryPress={onAddCategoryPress}
          />
          <BudgetGroup
            type={TransactionCategoryKind.Withdraw}
            all={allWithdraws}
            budgetId={budgetId}
            budgetOptions={withdrawBudgetCategories}
            notBudgetedCategories={withdrawCategories}
            onAddCategoryPress={onAddCategoryPress}
          />
          <BudgetGroup
            type={TransactionCategoryKind.Deposit}
            all={allDeposits}
            budgetId={budgetId}
            budgetOptions={depositBudgetCategories}
            notBudgetedCategories={depositCategories}
            onAddCategoryPress={onAddCategoryPress}
          />
          {children}
        </Column>
      </Container>
    </SummaryAndCategories>
  )
}