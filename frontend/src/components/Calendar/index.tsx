import React, { useCallback } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Calendar as BaseCalendar } from 'react-native-calendars'
import { useTheme } from 'styled-components/native'
import moment, { Moment } from 'moment-timezone'

import Day from './Day'

interface ICalendarProps {
  date: Moment
  markedDates?: any
  loading?: boolean
  onDateChange(date : Moment)
  onMonthChange?(date : Moment)
}

export default function Calendar({ markedDates, date, loading, onDateChange, onMonthChange, ...props } : ICalendarProps) {
  const theme = useTheme()

  const calendarTheme = {
    calendarBackground: 'transparent',
    textSectionTitleColor: theme.colors.text,
    selectedDayTextColor: theme.colors.text,
    todayTextColor: theme.colors.primary,
    monthTextColor: theme.colors.text,
    dayTextColor: theme.colors.text,
    textDisabledColor: theme.colors.disabled
  }

  const current = date ? date.format('YYYY-MM-DD') : null
  const onDayPress = useCallback(({ dateString }) => onDateChange(moment(dateString)), [onDateChange])
  const renderDay = useCallback((props) => <Day {...props} selected={props.date.dateString === current} />, [date, current])
  const renderArrow = useCallback((direction) => <MaterialIcons name={`chevron-${direction}`} color={theme.colors.accent} size={24} />, [theme])
  const handleMonthChange = useCallback(({ dateString }) => onMonthChange && onMonthChange(moment(dateString)), [onMonthChange])

  return (
    <BaseCalendar {...props}
      markedDates={markedDates}
      key={current}
      displayLoadingIndicator={loading}
      onMonthChange={handleMonthChange}
      markingType={'multi-dot'}
      theme={calendarTheme}
      enableSwipeMonths={true}
      dayComponent={renderDay}
      current={current}
      renderArrow={renderArrow}
      onDayPress={onDayPress} />
  )
}