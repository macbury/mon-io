import React, { useEffect, useCallback } from 'react'
import { useIsFocused } from 'react-navigation-hooks'

import { useStoreData } from '../../../stores'
import WideContainer from '../../../components/layout/WideContainer'
import FullPageLoader from '../../../components/layout/FullPageLoader'
import { useDefaultScreenBar } from '../../../helpers/useSetNavBarColor'
import Desktop from '../../../components/responsive/Desktop'
import Mobile from '../../../components/responsive/Mobile'
import Landscape from '../../../components/responsive/Landscape'
import Portrait from '../../../components/responsive/Portrait'
import useMonths from '../useMonths'

import FullChart from './FullChart'
import SmallChart from './SmallChart'

function useChartExpenseStore() {
  return useStoreData(({ screens: { charts }, settings }) => ({
    chartData: charts.expenses.chartData,
    loading: charts.expenses.isLoading,
    mainCurrency: settings.mainCurrency,
    categories: charts.expenses.categories,
    selectedCategoriesIds: charts.expenses.selectedCategoriesIds,
    fetch: charts.expenses.fetch,
    toggle: charts.expenses.toggle,
    selectOnly: charts.expenses.selectOnly,
  }))
}

function ExpensesTab() {
  const {
    chartData,
    loading,
    mainCurrency,
    categories,
    selectedCategoriesIds,
    fetch,
    toggle,
    selectOnly
  } = useChartExpenseStore()

  const months = useMonths()
  const isFocused = useIsFocused()

  const refresh = useCallback(() => {
    fetch(months)
  }, [months, fetch])

  useDefaultScreenBar()
  useEffect(() => {
    if (isFocused) {
      refresh()
    }
  }, [refresh, isFocused])

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <WideContainer navbar>
      <Desktop>
        <Landscape>
          <FullChart
            months={months}
            chartData={chartData}
            mainCurrency={mainCurrency}
            selectedCategoriesIds={selectedCategoriesIds}
            categories={categories}
            selectOnly={selectOnly}
            toggle={toggle} />
        </Landscape>
        <Portrait>
          <SmallChart
            months={months}
            chartData={chartData}
            mainCurrency={mainCurrency}
            selectedCategoriesIds={selectedCategoriesIds}
            categories={categories}
            selectOnly={selectOnly}
            toggle={toggle} />
        </Portrait>
      </Desktop>
      <Mobile>
        <SmallChart
          months={months}
          chartData={chartData}
          mainCurrency={mainCurrency}
          selectedCategoriesIds={selectedCategoriesIds}
          categories={categories}
          selectOnly={selectOnly}
          toggle={toggle} />
      </Mobile>
    </WideContainer>
  )
}

// @ts-ignore
ExpensesTab.navigationOptions = () => ({
  title: 'Expenses'
})


export default ExpensesTab