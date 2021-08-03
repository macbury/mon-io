import React, { useMemo, useCallback } from 'react'
import moment, { Moment } from 'moment-timezone'
import { summaryPath } from '../../helpers/urls'
import Menu from './Menu'

import DateNavigationHeader from '../../components/layout/DateNavigationHeader'
import { useSummary } from './hooks'

export default function Header(props) {
  const { currentDate, type, } = useSummary()
  const isToday = useMemo(() => (currentDate.isSame(moment(), 'month')), [currentDate])
  const summaryNavigationAction = useCallback((date : Moment) => (summaryPath(date, type)), [type])

  return (
    <DateNavigationHeader
      active={isToday}
      currentDate={currentDate}
      onChangeDate={summaryNavigationAction}
      {...props}>
        <Menu />
    </DateNavigationHeader>
  )
}