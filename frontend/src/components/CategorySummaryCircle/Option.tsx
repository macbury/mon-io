import React, { useCallback, useMemo } from 'react'
import { TouchableRipple, Text } from 'react-native-paper'
import styled from 'styled-components/native'
import { Hoverable } from 'react-native-web-hooks'
import { TransactionCategoryKind } from '../../api/graphql'
import { ICategoryOptionProps } from './types'
import CategoryIcon from '../CategoryIcon'
import { formatMoney } from '../../helpers/currency'

interface ICategoryNameProps {
  color: string;
}

const CategoryName = styled(Text)`
  color: ${(props : ICategoryNameProps) => props.color};
  text-align: center;
  margin-bottom: 10px;
`

const Amount = styled(Text)`
  text-align: center;
  font-size: 13px;
  color: ${(props : ICategoryNameProps) => props.color};
`

const ItemContainer = styled(TouchableRipple)`
  width: 90px;
  height: 100px;
  padding: 2px;
`

interface IInnerContainerProps {
  enabled: boolean;
}

const InnerContainer = styled.View`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  opacity: ${({ enabled } : IInnerContainerProps) => enabled ? 1 : 0.5};
`

export default function Option({ summary, kind, onCategoryPress } : ICategoryOptionProps) {
  const { category, amount } = summary

  const onPress = useCallback(() => {
    onCategoryPress(category, kind)
  }, [category, kind, onCategoryPress])

  const money = useMemo(() => {
    if (kind === TransactionCategoryKind.Deposit) {
      return formatMoney(summary.positive, true, false)
    } else if (kind === TransactionCategoryKind.Withdraw) {
      return formatMoney(summary.negative, true, false)
    } else {
      return formatMoney(summary.amount, true, false)
    }
  }, [summary, kind])

  return (
    <Hoverable>
      {() => (
        <ItemContainer onPress={onPress} centered borderless rippleColor={`${category.color}3C`}>
          <InnerContainer enabled={amount.cents !== 0}>
            <CategoryName numberOfLines={1} color={category.color}>{category.name}</CategoryName>
            <CategoryIcon
              size={40}
              color={category.color}
              name={category.icon} />
            <Amount color={category.color}>{money}</Amount>
          </InnerContainer>
        </ItemContainer>
      )}
    </Hoverable>
  )
}