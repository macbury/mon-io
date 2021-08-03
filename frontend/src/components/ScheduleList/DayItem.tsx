import React, { useMemo, useCallback } from 'react'
import styled, { DefaultTheme } from 'styled-components/native'
import { Moment } from 'moment-timezone'
import { Text, TouchableRipple } from 'react-native-paper'

import { PlannedItems } from '../../stores/Screens/SeriesStore'
import SeriesItem from './SeriesItem'
import PlanButton from './PlanButton'
import { onActionsShow } from './types'

export interface IDayItemProp {
  plannedItems: PlannedItems
  onGoToDate(date: Moment)
  onActionsShow: onActionsShow
}

const DayItemContainer = styled.View`
  flex-direction: row;
  min-height: 30px;
`

const DayContainer = styled(TouchableRipple)`
  border-right-width: 1px;
  border-right-color: ${(prop) => prop.theme.itemBorderColor};
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.itemBorderColor};
`

const DayInner = styled.View`
  min-height: 60px;
  padding: 12px 10px;
  width: 80px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

interface IDayProps {
  sunday: boolean
  theme?: DefaultTheme
}

const DayNumber = styled(Text)`
  font-size: 28px;
  opacity: 0.7;
  color: ${({ sunday, theme } : IDayProps) => sunday ? theme.colors.accent : theme.colors.text};
`

const DayName = styled(Text)`
  font-size: 14px;
  color: ${({ sunday, theme } : IDayProps) => sunday ? theme.colors.accent : theme.colors.text};
`

const TransactionsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.itemBorderColor};
`

export default function DayItem({ plannedItems, onGoToDate, onActionsShow, ...props } : IDayItemProp) {
  const day = useMemo(() => ({
    number: plannedItems.date.format('Do'),
    name: plannedItems.date.format('ddd')
  }), [plannedItems.date])

  const goToDate = useCallback(() => {
    onGoToDate(plannedItems.date)
  }, [onGoToDate, plannedItems])

  const items = plannedItems.items.map((item) => (
    <SeriesItem
      onActionsShow={onActionsShow}
      key={[item.series.id, item.date, item.id].join('-')}
      series={item.series}
      plannedTransaction={item} />
  ))

  return (
    <DayItemContainer {...props}>
      <DayContainer onPress={goToDate}>
        <DayInner>
          <DayNumber sunday={plannedItems.date.format('e') === '0'}>{day.number}</DayNumber>
          <DayName sunday={plannedItems.date.format('e') === '0'}>{day.name}</DayName>
        </DayInner>
      </DayContainer>
      <TransactionsContainer>
        {items}
        <PlanButton date={plannedItems.date} />
      </TransactionsContainer>
    </DayItemContainer>
  )
}