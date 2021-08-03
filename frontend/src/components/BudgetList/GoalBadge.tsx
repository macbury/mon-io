import React from 'react'
import { Text } from 'react-native-paper'
import { useFormatMoney } from '../../helpers/currency'
import { Money, TransactionCategoryKind } from '../../api/graphql'
import styled from 'styled-components/native'
import Icon from '../Icon'
import { HeaderType, textColorByType } from './types'

export interface IGoalBadgeProps {
  amount: Money
  type: HeaderType
}

const InGoalBadge = styled(Text)`
  font-size: 18px;
  color: ${textColorByType};
  line-height: 27px;
`

const OutsideOfGoalBadge = styled.View`
  font-size: 16px;
  color: #fff;
  border-radius: 8px;
  padding: 4px 8px;
  line-height: 27px;
  background-color: ${textColorByType}aa;
  border-color: ${textColorByType};
  border-width: 1px;
  flex-direction: row;
`

const AttentionIcon = styled(Icon)`
  margin-right: 5px;
`

export default function GoalBadge({ amount, type } : IGoalBadgeProps) {
  const amountText = useFormatMoney(amount, true)

  if (amount.cents >= 0) {
    return (
      <InGoalBadge type={type}>
        {amountText}
      </InGoalBadge>
    )
  } else {
    const icon = type == TransactionCategoryKind.Income ? "MaterialCommunityIcons:check-circle" : "FontAwesome:exclamation-circle"
    return (
      <OutsideOfGoalBadge type={type}>
        <AttentionIcon
          size={16}
          name={icon}
          color="#fff" />
        <Text>{amountText}</Text>
      </OutsideOfGoalBadge>
    )
  }
}