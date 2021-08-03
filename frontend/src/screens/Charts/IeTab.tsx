import React, { useEffect } from 'react'
import { useIsFocused } from 'react-navigation-hooks'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import FullPageLoader from '../../components/layout/FullPageLoader'
import { useStoreData } from '../../stores'

import useMonths from './useMonths'
import WideContainer from '../../components/layout/WideContainer'
import IncomeExpenseChart from '../../components/Charts/IncomeExpenseChart'
import IncomeExpenseDiffTable from '../../components/Tables/IncomeExpenseDiffTable'
import CenteredScroll from '../../components/CenteredScroll'
import { useDefaultScreenBar } from '../../helpers/useSetNavBarColor'


function useChartIncomeExpenseStore() {
  return useStoreData(({ screens: { charts: { ie } }, settings }) => ({
    fetch: ie.fetch,
    setOnly: ie.setOnly,
    toggle: ie.toggle,

    labels: ie.labels,
    loading: ie.isLoading,
    mainCurrency: settings.mainCurrency,
    timezoneName: settings.timezoneName,
    incomes: ie.incomes,
    expenses: ie.expenses,
    differences: ie.differences,
    summaries: ie.summaries,
  }))
}

export default function IeTab() {
  const { t } = useTranslation()

  const {
    loading,
    expenses,
    incomes,
    differences,
    mainCurrency,
    summaries,
    timezoneName,

    fetch,
  } = useChartIncomeExpenseStore()

  const months = useMonths()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      fetch(months)
    }
  }, [months, isFocused])

  useDefaultScreenBar()

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <WideContainer navbar>
      <CenteredScroll wide={true}>
        <IncomeExpenseChart
          currency={mainCurrency}
          differences={differences}
          incomes={incomes}
          expenses={expenses}  />

        <IncomeExpenseDiffTable
          timezoneName={timezoneName}
          summaries={summaries} />
      </CenteredScroll>
    </WideContainer>
  )
}