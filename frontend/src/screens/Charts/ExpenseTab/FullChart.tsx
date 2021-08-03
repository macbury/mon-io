import React from 'react'
import styled from 'styled-components/native'
import ExpensesChart from '../../../components/Charts/ExpensesChart'
import CategoryLegends from '../../../components/Charts/CategoryLegends'
import { IChartProps } from './shared'

const DesktopContainer = styled.View`
  flex: 1;
  flex-direction: row;
`

const ChartContainer = styled.ScrollView`
  flex: 1;
  margin-top: 100px;
`

const CategoriesFilter = styled.ScrollView`
  flex: 0.3;
  min-width: 450px;
  max-width: 480px;
  border-left-color: ${({ theme }) => theme.headerBorderColor};
  border-left-width: 2px;
`

export default function FullChart(props : IChartProps) {
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
    <DesktopContainer>
      <ChartContainer>
        <ExpensesChart
          height={600}
          months={months}
          chartData={chartData}
          currency={mainCurrency} />
      </ChartContainer>
      <CategoriesFilter>
        <CategoryLegends
          selectOnly={selectOnly}
          toggle={toggle}
          selectedCategoriesIds={selectedCategoriesIds}
          categories={categories} />
      </CategoriesFilter>
    </DesktopContainer>
  )
}