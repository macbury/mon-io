import React from 'react'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { Moment } from 'moment-timezone'
import { CategoryBudget, TransactionCategoryKind } from '../../api/graphql'
import Icon from '../Icon'
import { useFormatMoney } from '../../helpers/currency'

const artBackground = require('../../assets/art-dark.png')

interface ICategorySummaryProps {
  categoryBudget : CategoryBudget
  date : Moment
  kind: TransactionCategoryKind
}

const AboutCategoryContainer = styled.ImageBackground`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px 25px;
`

const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 15px;
  padding-bottom: 10px;
`

const CategoryName = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 26px;
`

const DateOrCurrentAmount = styled(Text)`
  font-size: 18px;
  color: #fff;
`

const ProgressBarContainer = styled.View`
  height: 14px;
  background: ${({ theme }) => theme.budgetProgressBackgroundColor};
  border-radius: 10px;
  border-width: 1px;
  overflow: hidden;
  border-color: ${({ theme }) => theme.budgetProgressBorderColor};
  margin-bottom: 10px;
`

interface IProgressProps {
  value: number
}

const ProgressValue = styled.View`
  height: 14px;
  background: #fff;
  width: ${(props : IProgressProps) => props.value * 100}%;
`

const PlannedSpendRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const PlannedOrSpendLabel = styled(Text)`
  font-size: 18px;
  color: #fff;
`
const TopRowDetails = styled.View`

`

const IconContainer = styled.View`
  background: #fff;
  border-radius: 50px;
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
`

export default function CategorySummary({ categoryBudget, date, kind } : ICategorySummaryProps) {
  const {
    category,
    planned,
    spend,
    executed
  } = categoryBudget

  const plannedMoney = useFormatMoney(planned)
  const spendMoney = useFormatMoney(spend)
  const { t } = useTranslation()

  return (
    <AboutCategoryContainer style={{ backgroundColor: category.color }} source={artBackground} resizeMode="cover">
      <TopRow>
        <TopRowDetails>
          <CategoryName>{category.name}</CategoryName>
          <DateOrCurrentAmount>{date.format('MMMM YYYY')}</DateOrCurrentAmount>
        </TopRowDetails>

        <IconContainer>
          <Icon
            color={category.color}
            size={38}
            name={category.icon} />
        </IconContainer>
      </TopRow>
      <ProgressBarContainer>
        <ProgressValue value={executed} />
      </ProgressBarContainer>
      <PlannedSpendRow>
        <PlannedOrSpendLabel>
          {t('pages.edit_budget_screen.summary.'+kind, { amount: spendMoney })}
        </PlannedOrSpendLabel>
        <PlannedOrSpendLabel>
          {t('pages.edit_budget_screen.summary.budgeted', { amount: plannedMoney })}
        </PlannedOrSpendLabel>
      </PlannedSpendRow>
    </AboutCategoryContainer>
  )
}