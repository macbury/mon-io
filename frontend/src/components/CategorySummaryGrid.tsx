import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, GridOptionsContainer } from './CategorySummaryCircle/styles'
import CategoryOption from './CategorySummaryCircle/Option'
import { ICategorySummaryProps } from './CategorySummaryCircle/types'
import ListHeaderTitle from '../components/layout/ListHeaderTitle'
import { TransactionCategoryKind } from '../api/graphql'

function useCategoryItems(filterKind: TransactionCategoryKind, creationKind: TransactionCategoryKind, categories, onCategoryPress) {
  return useMemo(() => (
    categories
      .filter(({ category: { kind } }) => (kind === filterKind))
      .map((summary) => (
        <CategoryOption
          key={summary.id}
          kind={creationKind}
          onCategoryPress={onCategoryPress}
          summary={summary} />
      ))
  ), [categories, onCategoryPress])
}

export default function CategorySummaryGrid(props : ICategorySummaryProps) {
  const { t } = useTranslation()
  const { categories, onCategoryPress } = props

  const incomeCategories = useCategoryItems(TransactionCategoryKind.Income, TransactionCategoryKind.Income, categories, onCategoryPress)
  const depositCategories = useCategoryItems(TransactionCategoryKind.Saving, TransactionCategoryKind.Deposit, categories, onCategoryPress)
  const withdrawCategories = useCategoryItems(TransactionCategoryKind.Saving, TransactionCategoryKind.Withdraw, categories, onCategoryPress)
  const loansCategories = useCategoryItems(TransactionCategoryKind.Loan, TransactionCategoryKind.Loan, categories, onCategoryPress)

  if (categories.length === 0) {
    return null
  }

  return (
    <Container>
      <ListHeaderTitle>{t('pages.summary.transactions.add.income')}</ListHeaderTitle>
      <GridOptionsContainer>
        {incomeCategories}
      </GridOptionsContainer>
      <ListHeaderTitle>{t('pages.summary.transactions.add.deposit')}</ListHeaderTitle>
      <GridOptionsContainer>
        {depositCategories}
      </GridOptionsContainer>
      <ListHeaderTitle>{t('pages.summary.transactions.add.withdraw')}</ListHeaderTitle>
      <GridOptionsContainer>
        {withdrawCategories}
      </GridOptionsContainer>
      <ListHeaderTitle>{t('pages.summary.transactions.add.loans')}</ListHeaderTitle>
      <GridOptionsContainer>
        {loansCategories}
      </GridOptionsContainer>
    </Container>
  )
}