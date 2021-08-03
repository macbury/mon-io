import React from 'react'
import styled from 'styled-components/native'
import ExpensesChart from '../../../components/Charts/ExpensesChart'
import CategoryLegends from '../../../components/Charts/CategoryLegends'
import CenteredScroll from '../../../components/CenteredScroll'
import { IChartProps } from './shared'


export default function SmallChart(props : IChartProps) {
  const {
    months,
    chartData,
    mainCurrency,
    categories,
    selectedCategoriesIds,
    selectOnly,
    toggle
  } = props

  return (
    <CenteredScroll wide={true}>
      <ExpensesChart
        height={400}
        months={months}
        chartData={chartData}
        currency={mainCurrency}
      />

      <CategoryLegends
        selectOnly={selectOnly}
        toggle={toggle}
        selectedCategoriesIds={selectedCategoriesIds}
        categories={categories} />
    </CenteredScroll>
  )
}