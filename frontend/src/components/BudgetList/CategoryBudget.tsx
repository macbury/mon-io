import React from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from 'react-native-paper'
import { TransactionCategoryKind } from '../../api/graphql'
import { BudgetOption } from '../../stores/Screens/BudgetStore/Budget'
import { editCategoryBudgetPath } from '../../helpers/urls'
import { useFormatMoney } from '../../helpers/currency'
import Link from '../Link'
import CategoryIcon from '../CategoryIcon'
import GoalBadge from './GoalBadge'
import ProgressBar from './ProgressBar'

const DetailsIcon = styled(MaterialIcons)`
  margin-left: 5px;
`

interface IColor {
  color?: string;
  theme?: DefaultTheme
}

export interface ICategoryBudgetProps {
  option: BudgetOption
  budgetId: string
  type: TransactionCategoryKind
}

const RowTitleAndPriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 5px 0px;
`

const LinkContainer = styled(Link)`
  border-bottom-color: ${(props) => props.theme.itemBorderColor};
  border-bottom-width: 1px;
  flex-direction: column;
`

const SummaryHeader = styled.View`
  flex-direction: row;
`

const Details = styled.View`
  flex-grow: 1;
`

const RowTitle = styled(Text)`
  font-size: 16px;
`

const RowTitleWithIcon = styled.View`
  flex-direction: row;
`

const RowSpendAndBudgeted = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px 10px 0px;
`

const SpendTitle = styled(Text)`
  font-size: 14px;
  color: ${({ color } : IColor) => color};
`

const BudgetedTitle = styled(Text)`
  font-size: 14px;
  opacity: 0.6;
`

const IconContainer = styled.View`
  width: 83px;
  justify-content: center;
`

const Icon = styled(CategoryIcon)`
  margin: 0 auto;
`

export default function CategoryBudgetItem(props : ICategoryBudgetProps) {
  const theme = useTheme()
  const {
    type,
    option: {
      category,
      totalSpending,
      totalPlanned,
      myExecuted,
      othersExecuted,
      available,
      shared
    },
    budgetId
  } = props

  const spendMoney = useFormatMoney(totalSpending)
  const plannedMoney = useFormatMoney(totalPlanned)
  const kind = category.kind === TransactionCategoryKind.Tax ? TransactionCategoryKind.Tax : type

  return (
    <LinkContainer ripple grow action={editCategoryBudgetPath(budgetId, category.id, kind)}>
      <SummaryHeader>
        <IconContainer>
          <Icon
            name={category.icon}
            size={48}
            color={category.color} />
        </IconContainer>

        <Details>
          <RowTitleAndPriceContainer>
            <RowTitleWithIcon>
              <RowTitle>{category.name}</RowTitle>
              {shared && <DetailsIcon name="share-variant" color={theme.colors.text} size={16} />}
            </RowTitleWithIcon>

            <GoalBadge amount={available} type={kind} />
          </RowTitleAndPriceContainer>
          <ProgressBar
            myExecuted={myExecuted}
            othersExecuted={othersExecuted}
            category={category} />
          <RowSpendAndBudgeted>
            <SpendTitle color={category.color}>
              {spendMoney}
            </SpendTitle>
            <BudgetedTitle>
              {plannedMoney}
            </BudgetedTitle>
          </RowSpendAndBudgeted>
        </Details>
      </SummaryHeader>
    </LinkContainer>
  )
}