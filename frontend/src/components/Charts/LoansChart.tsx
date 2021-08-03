import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { VictoryChart, VictoryArea, VictoryLabel, VictoryAxis, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from 'victory-native'
import { formatMoney } from '../../helpers/currency'
import { Currency } from '../../api/graphql'

const Container = styled.View`
  height: 500px;
  flex-direction: row;
`

type RowData = { x: string, y: number }

export interface ILoansChart {
  data: RowData[]
  currency: Currency
}

export default function LoansChart({ data, currency } : ILoansChart) {
  const theme = useTheme()
  const [size, setSize] = useState({ width: 0, height: 0 })

  const scatterProps = {
    labelComponent: <VictoryTooltip dy={-10} />,
    mouseFollowTooltips: true,
    voronoiBlacklist: ['loans'],
    labels: ({ datum: { y } }) => formatMoney({ cents: y, currency })
  }

  return (
    <Container onLayout={(e) => setSize(e.nativeEvent.layout)}>
      <VictoryChart
        minDomain={{ y: 0 }}
        maxDomain={{ x: data.length }}
        theme={theme.victory}
        {...size}
        containerComponent={<VictoryVoronoiContainer style={{ flex: 1 }} {...scatterProps} />}
        padding={{ left: 120, bottom: 50, right: 10, top: 10 }}>

        <VictoryArea
          name="loans"
          data={data}
          style={{ data: { stroke: theme.loanColor, fill: theme.loanBackgroundColor } }} />
        <VictoryScatter
          data={data}
          style={{ data: { fill: theme.loanColor } }} />
        <VictoryAxis
          dependentAxis
          crossAxis
          tickCount={10}
          tickFormat={(cents) => formatMoney({ cents, currency }, true, true, 0)} />
        <VictoryAxis
          crossAxis
          tickLabelComponent={<VictoryLabel textAnchor="end" angle={-30} dy={0}/>} />
      </VictoryChart>
    </Container>
  )
}
