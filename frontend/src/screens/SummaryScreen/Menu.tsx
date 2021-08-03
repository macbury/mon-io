import React, { useCallback, useMemo } from 'react'
import moment, { Moment } from 'moment-timezone'
import DateNavigation from '../../components/DateNavigation'
import MenuActionButton from '../../components/MenuActionButton'
import { TransactionCategoryKind } from '../../api/graphql'
import AppBarTab from '../../components/AppBarTab'
import { summaryPath } from '../../helpers/urls'
import Desktop from '../../components/responsive/Desktop'
import { useSummary } from './hooks'

export default function SummaryMenu() {
  const { refresh, currentDate, type } = useSummary()
  const isToday = useMemo(() => (currentDate.isSame(moment(), 'month')), [currentDate])
  const summaryNavigationAction = useCallback((date : Moment) => (summaryPath(date, type)), [type])

  return (
    <React.Fragment>
      <AppBarTab
        current={type === TransactionCategoryKind.ExpenseOrTax}
        icon="MaterialCommunityIcons:basket-fill"
        action={summaryPath(currentDate, TransactionCategoryKind.ExpenseOrTax)} />
      <AppBarTab
        current={type === TransactionCategoryKind.IncomeOrSaving}
        icon="MaterialCommunityIcons:bank-transfer"
        action={summaryPath(currentDate, TransactionCategoryKind.IncomeOrSaving)} />
      <Desktop>
        <DateNavigation
          today={isToday}
          onChangeDate={summaryNavigationAction}
          currentDate={currentDate} />
      </Desktop>
      <MenuActionButton icon="reload" onPress={refresh} />
    </React.Fragment>
  )
}
