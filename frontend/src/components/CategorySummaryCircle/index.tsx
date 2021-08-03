import React, { useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'

import { ICategorySummaryProps } from './types'
import CategoryOption from './Option'
import Chart from './Chart'
import { chunks } from '../../helpers/array'
import ListHeaderTitle from '../layout/ListHeaderTitle'
import { TransactionCategoryKind } from '../../api/graphql'
import { Container, OptionsContainer, TopRow, CenterRow, CenterSideRow, BottomRow } from './styles'

export default function CategorySummaryCircle(props : ICategorySummaryProps) {
  const { categories, onCategoryPress, sumOfCategoriesInCents, mainCurrency, onPress } = props
  const isDesktop = useMediaQuery({ minWidth: 800 })
  const items = useMemo(() => (
    chunks(categories.map((summary) => (
      <CategoryOption
        key={summary.id}
        kind={TransactionCategoryKind.Expense}
        onCategoryPress={onCategoryPress}
        summary={summary} />
    )), [4, 3, 3, 4])
  ), [categories, onCategoryPress])

  if (categories.length === 0) {
    return null
  }

  return (
    <Container>
      <ListHeaderTitle>Add expense</ListHeaderTitle>
      <OptionsContainer>
        <TopRow isDesktop={isDesktop}>{items[0]}</TopRow>

        <CenterRow isDesktop={isDesktop}>
          <CenterSideRow>{items[1]}</CenterSideRow>
          <Chart
            onPress={onPress}
            currency={mainCurrency}
            categories={categories}
            sumOfCategoriesInCents={sumOfCategoriesInCents} />
          <CenterSideRow>{items[2]}</CenterSideRow>
        </CenterRow>

        <BottomRow isDesktop={isDesktop}>
          {items.slice(3)}
        </BottomRow>
      </OptionsContainer>
    </Container>
  )
}