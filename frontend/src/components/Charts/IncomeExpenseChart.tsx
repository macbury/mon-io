import React, { useState } from 'react'
import moment from 'moment-timezone'
import styled, { useTheme } from 'styled-components/native'
import { VictoryLabel, VictoryChart, VictoryLine, VictoryAxis, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from 'victory-native'
import { formatMoney } from '../../helpers/currency'
import { Currency } from '../../api/graphql'

const Container = styled.View`
  height: 500px;
  flex-direction: row;
`

type RowData = { x: string, y: number }

export interface IIncomeExpenseChart {
  expenses: RowData[]
  incomes: RowData[]
  differences: RowData[]
  currency: Currency
}

export default function IncomeExpenseChart({ expenses, incomes, differences, currency } : IIncomeExpenseChart) {
  const theme = useTheme()
  const [size, setSize] = useState({ width: 0, height: 0 })

  const scatterProps = {
    labelComponent: <VictoryTooltip dy={-10} />,
    mouseFollowTooltips: true,
    voronoiBlacklist: ['lineExpenses', 'lineIncomes', 'lineDifferences'],
    labels: ({ datum: { y } }) => formatMoney({ cents: y, currency })
  }

  return (
    <Container onLayout={(e) => setSize(e.nativeEvent.layout)}>
      <VictoryChart
        minDomain={{ y: 0 }}
        theme={theme.victory}
        {...size}
        containerComponent={<VictoryVoronoiContainer style={{ flex: 1 }} {...scatterProps} />}
        padding={{ left: 120, bottom: 40, right: 10, top: 10 }}>

        <VictoryLine
          name="lineExpenses"
          data={expenses}
          style={{ data: { stroke: theme.expenseColor } }} />
        <VictoryScatter
          data={expenses}
          style={{ data: { fill: theme.expenseColor } }} />
        <VictoryLine
          name="lineIncomes"
          data={incomes}
          style={{ data: { stroke: theme.incomeColor } }} />
        <VictoryScatter
          data={incomes}
          style={{ data: { fill: theme.incomeColor } }} />
        <VictoryLine
          name="lineDifferences"
          data={differences}
          style={{ data: { stroke: theme.savingColor } }} />
        <VictoryScatter
          data={differences}
          style={{ data: { fill: theme.savingColor } }}/>

        <VictoryAxis
          dependentAxis
          crossAxis
          tickCount={10}
          tickFormat={(cents) => formatMoney({ cents, currency }, true, true, 0)} />
        <VictoryAxis 
          tickLabelComponent={<VictoryLabel textAnchor="end" angle={-30} dy={0}/>}
          tickFormat={(date) => moment(date).format('MMM')}
          crossAxis />
      </VictoryChart>
    </Container>
  )
}
