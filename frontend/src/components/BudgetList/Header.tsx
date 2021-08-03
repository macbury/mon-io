import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Money, CategoryBudget } from '../../api/graphql'
import { useFormatMoney } from '../../helpers/currency'
import { HeaderType, backgroundColorByType, textColorByType, IStyleProps } from './types'
import GoalBadge from './GoalBadge'

export interface IHeaderProps {
  type: HeaderType
  categories: CategoryBudget[]
}

const HeaderRowContainer = styled.View`
  background: ${backgroundColorByType};
  border-bottom-color: ${({ theme }) => theme.itemBorderColor};
  border-bottom-width: 1px;
  border-top-color: ${({ theme }) => theme.itemBorderColor};
  border-top-width: 1px;
`

const HeaderRowTitleAndPriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 5px 20px;
`

const HeaderRowTitle = styled(Text)`
  font-size: 18px;
`

const ProgressBarContainer = styled.View`
  margin: 0px 20px 5px 20px;
  height: 14px;
  background: ${({ theme }) => theme.budgetProgressBackgroundColor};
  border-radius: 8px;
  border-width: 1px;
  overflow: hidden;
  border-color: ${({ theme }) => theme.budgetProgressBorderColor};
`

const ProgressValue = styled.View`
  height: 14px;
  background: ${textColorByType};
  width: ${(props : IStyleProps) => props.value * 100}%;
`

const HeaderRowSpendAndBudgeted = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px 10px 20px;
`

const HeaderSpendTitle = styled(Text)`
  font-size: 14px;
  color: ${textColorByType};
`

const HeaderBudgetedTitle = styled(Text)`
  font-size: 14px;
  opacity: 0.6;
`

function sumMoney(a : Money , b : Money) : Money {
  return {
    cents: a.cents + b.cents,
    currency: a.currency
  }
}

function extractSpend(categoryBudget : CategoryBudget) {
  return categoryBudget.exchangedSpend
}

function extractPlanned(categoryBudget : CategoryBudget) {
  return categoryBudget.exchangedPlanned
}

function extractExecuted(categoryBudget : CategoryBudget) {
  return categoryBudget.executed
}

function sumNumber(a : number, b : number) {
  return a + b
}

export default function Header({ type, categories } : IHeaderProps) {
  const { t } = useTranslation()

  const spend = useMemo(() => categories.map(extractSpend).reduce(sumMoney), [categories])
  const planned = useMemo(() => categories.map(extractPlanned).reduce(sumMoney), [categories])
  const executed = useMemo(() => {
    const plannedCategoryCount = categories.filter(({ exchangedPlanned }) => (exchangedPlanned.cents > 0)).length

    if (plannedCategoryCount === 0) {
      return 0
    } else {
      return categories.map(extractExecuted).reduce(sumNumber) / plannedCategoryCount
    }
  }, [categories])

  const available = useMemo(() => ({
    cents: planned.cents - spend.cents,
    currency: planned.currency
  }), [planned, spend])

  const spendText = useFormatMoney(spend)
  const plannedText = useFormatMoney(planned)

  return (
    <HeaderRowContainer type={type}>
      <HeaderRowTitleAndPriceContainer>
        <HeaderRowTitle>{t(`pages.budget.header.${type}.title`)}</HeaderRowTitle>
        <GoalBadge
          amount={available}
          type={type} />
      </HeaderRowTitleAndPriceContainer>
      <ProgressBarContainer>
        <ProgressValue type={type} value={executed} />
      </ProgressBarContainer>
      <HeaderRowSpendAndBudgeted>
        <HeaderSpendTitle type={type}>
          {t(`pages.budget.header.${type}.current`, { amount: spendText })}
        </HeaderSpendTitle>
        <HeaderBudgetedTitle>
          {t(`pages.budget.header.${type}.budgeted`, { amount: plannedText })}
        </HeaderBudgetedTitle>
      </HeaderRowSpendAndBudgeted>
    </HeaderRowContainer>
  )
}