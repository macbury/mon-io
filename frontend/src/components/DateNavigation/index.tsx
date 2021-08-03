import React from 'react'
import { Moment } from 'moment-timezone'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components/native'
import DateNextPrevButton from './DateNextPrevButton'
import TodayButton from './TodayButton'
import { NavigationNavigateAction } from 'react-navigation'

interface IResponsiveProp {
  isDesktop: boolean;
}

export const DateHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${(props : IResponsiveProp) => props.isDesktop ? 0 : 0}px;
`

interface IDateNavigationProps {
  today: boolean
  currentDate: Moment,
  onChangeDate(date : Moment) : NavigationNavigateAction
}

export default function DateNavigation({ today, currentDate, onChangeDate } : IDateNavigationProps) {
  const isDesktop = useMediaQuery({ minWidth: 800 })

  return (
    <DateHeader isDesktop={isDesktop}>
      <DateNextPrevButton
        onChangeDate={onChangeDate}
        mode="prev"
        selectedDate={currentDate} />
      <TodayButton
        today={today}
        selectedDate={currentDate}
        onChangeDate={onChangeDate} />
      <DateNextPrevButton
        onChangeDate={onChangeDate}
        mode="next"
        selectedDate={currentDate} />
    </DateHeader>
  )
}