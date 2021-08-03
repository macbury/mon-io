import React, { useState, useMemo } from 'react'
import { uniq, max } from 'underscore'
import styled, { useTheme } from 'styled-components/native'
import { VictoryBrushContainer, VictoryChart, VictoryArea, VictoryLabel, VictoryAxis, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer, VictoryLine } from 'victory-native'
import { formatMoney } from '../../helpers/currency'
import { Currency } from '../../api/graphql'

const PIXELS_PER_TICK = 70
const HISTORY_HEIGHT = 100

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`

type RowData = { x: Date, y: number }

export interface IMonthsLineChart {
  data: RowData[]
  currency: Currency
  lineColor: string
  backgroundColor
}

export default function MonthsLineChart({ data, currency, lineColor, backgroundColor, ...props } : IMonthsLineChart) {
  const theme = useTheme()
  const [selectedDomain, setSelectedDomain] = useState<any>()
  const [size, setSize] = useState({ width: 0, height: 0 })

  const yearsTicks = useMemo(() => {
    const dataYears = data.map(({ x }) => x.getFullYear())
    const years = uniq([...dataYears, (new Date().getFullYear())])
    return years.map((year) => new Date(year, 1, 1))
  }, [data])

  const maxDomain = useMemo(() => {
    const maxAmount = max([...data.map(({ y }) => y), 1])
    const y = maxAmount * 1.3
    return {
      y
    }
  }, [data])

  const tickCount = Math.max(5, Math.ceil(size.width / PIXELS_PER_TICK))

  const containerComponent = <VictoryVoronoiContainer responsive={false}
    labelComponent={<VictoryTooltip />}
    mouseFollowTooltips
    voronoiBlacklist={['rows']}
    labels={({ datum: { y } }) => formatMoney({ cents: y, currency })} />

  return (
    <Container onLayout={(e) => setSize(e.nativeEvent.layout)} {...props}>
      <VictoryChart
        maxDomain={maxDomain}
        domain={selectedDomain}
        height={size.height - HISTORY_HEIGHT - 15}
        width={size.width}
        scale={{x: "time"}}
        theme={theme.victory}
        padding={{ left: 100, right: 0, top: 10, bottom: 60 }}
        containerComponent={containerComponent}>
        <VictoryScatter
          data={data}
          name="rows"
          style={{ data: { fill: lineColor } }} />
        <VictoryArea
          style={{ data: { stroke: lineColor, fill: backgroundColor } }}
          data={data} />
        <VictoryAxis
          dependentAxis
          crossAxis
          tickCount={size.height / PIXELS_PER_TICK}
          tickFormat={(cents) => formatMoney({ cents, currency }, true, true, 0)} />
        <VictoryAxis
          crossAxis
          tickCount={tickCount}
          tickLabelComponent={<VictoryLabel textAnchor="end" angle={-30} dy={0}/>} />
      </VictoryChart>

      <VictoryChart
        width={size.width}
        height={HISTORY_HEIGHT}
        theme={theme.victory}
        scale={{x: "time"}}
        padding={{top: 0, left: 100, right: 0, bottom: 30}}
        containerComponent={
          <VictoryBrushContainer responsive={false}
            brushDimension="x"
            brushDomain={selectedDomain}
            brushStyle={{ fill: theme.chartBrushColor, fillOpacity: theme.chartBrushOpacity, stroke: 'transparent' }}
            onBrushDomainChange={setSelectedDomain}
          />
        }>
          <VictoryAxis tickValues={yearsTicks} tickFormat={(x : Date) => x.getFullYear()} />
          <VictoryLine style={{ data: {stroke: lineColor} }} data={data} />
      </VictoryChart>
    </Container>
  )
}
