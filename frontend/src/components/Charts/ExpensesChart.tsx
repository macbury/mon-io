import React, { useMemo, useState } from 'react'
import moment from 'moment-timezone'
import { View } from 'react-native'
import { VictoryChart, VictoryStack, VictoryBar, VictoryAxis, VictoryLabel } from 'victory-native'
import { useTheme } from 'styled-components/native'
import { formatMoney } from '../../helpers/currency'
import { Currency } from '../../api/graphql'

type BarData = {
  x: string;
  y: number;
  color: string;
}

type RowData = Array<BarData>

export interface IExpensesChartProps {
  currency: Currency
  chartData: Array<RowData>
  months: number
  height: number
}

export default function ExpensesChart(props : IExpensesChartProps) {
  const theme = useTheme()
  const [width, setWidth] = useState(0)
  const {
    currency,
    chartData,
    months,
    height
  } = props

  const rows = useMemo(() => {
    return chartData.map((row, index) => {
      return (
        <VictoryBar
          key={index}
          data={row}
          barRatio={0.5}
          alignment="middle"
          style={{ data: { fill: row[0].color } }}
        />
      )
    })
  }, [chartData])

  return (
    <View onLayout={({ nativeEvent: { layout: { width } } }) => setWidth(width)} {...props}>
      <VictoryChart
        minDomain={{ x: 0 }}
        maxDomain={{ x: months + 1 }}
        height={height}
        width={width}
        theme={theme.victory}
        padding={{ left: 120, bottom: 40, right: 10, top: 10 }}>
        <VictoryStack domainPadding={{ x: [20, 20], y: [0, 15] }}>
          { rows }
        </VictoryStack>

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
    </View>
  )
}