import React, { useCallback } from 'react'
import styled, { DefaultTheme } from 'styled-components/native'
import { Text, TouchableRipple } from 'react-native-paper'
import { Series } from '../../api/graphql'
import CategoryIcon from '../CategoryIcon'
import CheckIcon from '../Icon'
import Currency from '../Currency'
import { onActionsShow, SeriesTransaction } from './types'

export enum DetailsType {
  NextDate,
  Recurrence
}

interface IStyleProp {
  theme?: DefaultTheme
}

export interface ISeriesItemProps {
  plannedTransaction: SeriesTransaction
  series: Series
  onActionsShow: onActionsShow
}

const Inner = styled.View<IStyleProp>`
  display: flex;
  flex-direction: row;
  padding: 13px 15px;
  align-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.itemBorderColor};
  align-items: center;
`

const Icon = styled(CategoryIcon)`
  margin-bottom: 0px;
  margin-right: 15px;
`

const Details = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const DetailsRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 0px;
`

interface ICategoryNameProps {
  color: string
}

const CategoryName = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: ${({ color } : ICategoryNameProps) => color};
`

const StyledCheckIcon = styled(CheckIcon)`
  margin-left: 10px;
`

const Notes = styled(Text)`
  font-style: italic;
  margin-top: 2px;
`

export default function SeriesItem(props : ISeriesItemProps) {
  const {
    onActionsShow,
    series,
    plannedTransaction
  } = props

  const {
    __typename,
    category,
    amount,
    notes
  } = plannedTransaction

  const executed = __typename === 'Transaction'
  const showActions = useCallback(() => onActionsShow(series, plannedTransaction), [onActionsShow, series, plannedTransaction])

  return (
    <TouchableRipple onPress={showActions}>
      <Inner >
        <Icon
          name={category.icon}
          color={category.color}
          size={48} />
        <Details>
          <DetailsRow>
            <CategoryName color={category.color}>{category.name}</CategoryName>
            {executed && <StyledCheckIcon name="MaterialCommunityIcons:check" size={16} />}
          </DetailsRow>
          {notes.length > 0 && <Notes numberOfLines={1}>{notes}</Notes>}
        </Details>

        <Currency
          amount={amount}
          size={18} />
      </Inner>
    </TouchableRipple>
  )
}