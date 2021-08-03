import React, { useCallback } from 'react'
import { TouchableRipple, Text } from 'react-native-paper'
import styled from 'styled-components/native'
import CategoryIcon from '../CategoryIcon'
import { Category, Money, TransactionCategoryKind } from '../../api/graphql'
import { useFormatMoney } from '../../helpers/currency'

interface ICategoryNameProps {
  color: string;
}

export interface ICategoryOptionProps {
  category: Category
  spend: Money
  width: number
  type: TransactionCategoryKind
  onCategoryPress(category : Category, type: TransactionCategoryKind)
}

const CategoryName = styled(Text)`
  color: ${(props : ICategoryNameProps) => props.color};
  text-align: center;
  margin-bottom: 10px;
`

const CurrentlySpend = styled(Text)`
  color: ${(props : ICategoryNameProps) => props.color};
  text-align: center;
  margin-bottom: 10px;
`

interface IContainerProps {
  width?: number;
  present?: boolean;
}

const ItemContainer = styled(TouchableRipple)`
  width: ${(props : IContainerProps) => `${props.width}%`};
  height: 118px;
  padding: 2px;
  padding-top: 12px;
  border-radius: 10px;
  overflow: hidden;
`

const Icon = styled(CategoryIcon)`
  opacity: ${({ present } : IContainerProps) => present ? 1.0 : 0.5 };
`

const InnerContainer = styled.View`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`

export default function CategoryOption(props : ICategoryOptionProps) {
  const { type, spend, category, width, onCategoryPress } = props
  const kind = category.kind === TransactionCategoryKind.Tax ? category.kind : type
  const onPress = useCallback(() => onCategoryPress(category, kind), [onCategoryPress, category, kind])
  const amount = useFormatMoney(spend)
  const present = spend.cents !== 0

  return (
    <ItemContainer
      width={width}
      onPress={onPress}
      rippleColor={`${category.color}3C`}>
      <InnerContainer>
        <CategoryName color={category.color} numberOfLines={1}>{category.name}</CategoryName>
        <Icon
          present={present}
          size={40}
          color={category.color}
          name={category.icon} />
        <CurrentlySpend color={category.color}>{present ? amount : '-'}</CurrentlySpend>
      </InnerContainer>
    </ItemContainer>
  )
}