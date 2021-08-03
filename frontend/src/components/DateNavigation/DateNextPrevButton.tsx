import React, { useMemo } from 'react'
import moment, { Moment } from 'moment-timezone'
import { NavigationNavigateAction } from 'react-navigation'
import Link from '../Link'
import Icon from '../Icon'
import styled from 'styled-components/native'

const Button = styled(Link)`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-content: center;
  align-items: center;
`

interface IDateNextPrevButtonProps {
  selectedDate: Moment
  mode: 'next' | 'prev'
  onChangeDate(date : Moment) : NavigationNavigateAction
}

export default function DateNextPrevButton({ selectedDate, mode, onChangeDate } : IDateNextPrevButtonProps) {
  const action = useMemo(() => {
    if (mode === 'next') {
      const date = moment(selectedDate).startOf('month').add(1, 'month')
      return onChangeDate(date)
    } else {
      const date = moment(selectedDate).startOf('month').subtract(1, 'month')
      return onChangeDate(date)
    }
  }, [mode, selectedDate])

  const icon = mode === 'next' ? 'chevron-right' : 'chevron-left'

  return (
    <Button ripple action={action}>
      <Icon size={24} name={`MaterialCommunityIcons:${icon}`} />
    </Button>
  )
}
