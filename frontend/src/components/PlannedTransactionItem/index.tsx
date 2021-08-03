import React, { useMemo, useCallback } from 'react'
import moment from 'moment-timezone'
import { useTranslation } from 'react-i18next'
import styled, { DefaultTheme } from 'styled-components/native'
import { Text } from 'react-native-paper'
import { NavigationNavigateAction } from 'react-navigation'
import { PlannedTransaction, Series } from '../../api/graphql'
import Link from '../Link'
import CategoryIcon from '../CategoryIcon'
import Currency from '../Currency'

export enum DetailsType {
  NextDate,
  Recurrence
}

interface IStyleProp {
  bigger?: boolean
  theme?: DefaultTheme
}
export interface IPlannedTransactionItemProps {
  plannedTransaction: PlannedTransaction
  series: Series
  bigger?: boolean
  hidePlanned?: boolean
  action: NavigationNavigateAction
  type?: DetailsType
  onActionsShow(series : Series, date : string)
}

const Inner = styled.View<IStyleProp>`
  display: flex;
  flex-direction: row;
  padding: ${({ bigger }) => bigger ? '13px 15px' : '10px 15px'};
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

const Date = styled(Text)`
  opacity: 0.4;
  margin-left: 5px;
`

const Notes = styled(Text)`
  font-style: italic;
  margin-top: 2px;
`

export default function PlannedTransactionItem(props : IPlannedTransactionItemProps) {
  const {
    bigger,
    action,
    hidePlanned,
    plannedTransaction: {
      category,
      amount,
      date,
      notes
    },
    series,
    type,
    onActionsShow
  } = props

  const { t } = useTranslation()
  const showPlannedActionSheet = useCallback(() => onActionsShow(series, date), [onActionsShow, series, date])

  const formattedDate = useMemo(() => {
    if (hidePlanned) {
      return ''
    }

    return t(
      'planned_transaction.at_date',
      { date: moment(date).format('Do MMM YYYY') }
    )
  }, [date, t, hidePlanned])

  return (
    <Link ripple action={action} onLongPress={showPlannedActionSheet}>
      <Inner bigger={bigger}>
        <Icon
          name={category.icon}
          color={category.color}
          size={48} />
        <Details>
          <DetailsRow>
            <CategoryName color={category.color}>{category.name}</CategoryName>
            {!hidePlanned && type !== DetailsType.Recurrence && <Date>{formattedDate}</Date>}
          </DetailsRow>

          {notes.length > 0 && <Notes numberOfLines={1}>{notes}</Notes>}
        </Details>

        <Currency
          amount={amount}
          size={18} />
      </Inner>
    </Link>
  )
}