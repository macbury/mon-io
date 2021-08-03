import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LayoutChangeEvent } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Moment } from 'moment-timezone'
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native'
import { Text } from 'react-native-paper'
import { Money, Currency } from '../../api/graphql'
import { useFormatMoney, formatMoney } from '../../helpers/currency'

export interface ISummaryProps {
  date: Moment
  notBudgeted: Money
  totalSpend: Money
  totalPlanned: Money
  totalLeft: Money
  totalMissing: Money
  currency: Currency
}

const Container = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
`

const Chart = styled.View`
  border-top-width: 2px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const MonthLabel = styled(Text)`
  text-align: center;
  padding: 30px 10px 0px 10px;
  font-size: 18px;
`

const SpendVsLeft = styled.View`
  flex-direction: row;
  border-top-width: 2px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const Column = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`

const LastColumn = styled(Column)`
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.headerBorderColor};
`

const AmountLabel = styled(Text)`
  font-size: 20px;
  color: ${({ theme }) => theme.expenseColor};
  margin-bottom: 2px;
  font-weight: bold;
`

const AmountText = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.expenseColor};
`

export default function Summary(props : ISummaryProps) {
  const {
    date,
    totalSpend,
    totalPlanned,
    totalLeft,
    totalMissing,
    notBudgeted,
    currency
  } = props

  const { t } = useTranslation()

  const [width, setWidth] = useState(0)
  const theme = useTheme()
  const spend = useFormatMoney(totalSpend)
  const planned = useFormatMoney(totalPlanned)
  const left = useFormatMoney(totalLeft)
  const missing = useFormatMoney(totalMissing)
  const notBudgetedAmount = useFormatMoney(notBudgeted)

  const data = [
    { x: t('pages.budget.summary.chart.spent'), y: Math.max(totalSpend.cents, 0), color: theme.expenseColor },
    { x: t('pages.budget.summary.chart.planned'), y: Math.max(totalPlanned.cents, 0), color: theme.incomeColor },
    { x: t('pages.budget.summary.chart.left'), y: Math.max(totalLeft.cents, 0), color: theme.savingColor },
    { x: t('pages.budget.summary.chart.missing'), y: Math.max(totalMissing.cents, 0), color: theme.loanColor },
    { x: t('pages.budget.summary.chart.not_budgeted'), y: Math.max(notBudgeted.cents, 0), color: theme.colors.primary }
  ]

  const maxDomain = {
    x: data.length+1,
    y: Math.max(totalPlanned.cents * 1.2, 10000)
  }

  return (
    <Container>
      <Chart onLayout={(e : LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}>
        <MonthLabel>{t('pages.budget.summary.title', { month: date.format('MMMM') })}</MonthLabel>
        <VictoryChart
          minDomain={{ x: 0 }}
          maxDomain={maxDomain}
          padding={{ left: 120, bottom: 40, right: 10, top: 10 }}
          theme={theme.victory}
          height={300}
          width={width}>

          <VictoryBar
            animate
            padding={10}
            style={{ data: { fill: ({ datum }) => datum.color } }}
            barRatio={0.6}
            alignment="middle"
            data={data} />

          <VictoryAxis
            dependentAxis
            crossAxis
            tickFormat={(cents) => formatMoney({ cents, currency }, true, true, 0)} />
          <VictoryAxis />
        </VictoryChart>
      </Chart>
      <SpendVsLeft>
        <Column>
          <AmountLabel style={{ color: theme.expenseColor }}>{spend}</AmountLabel>
          <AmountText style={{ color: theme.expenseColor }}>{t('pages.budget.summary.chart.spent')}</AmountText>
        </Column>

        <LastColumn>
          <AmountLabel style={{ color: theme.loanColor }}>{missing}</AmountLabel>
          <AmountText style={{ color: theme.loanColor }}>{t('pages.budget.summary.chart.missing')}</AmountText>
        </LastColumn>
      </SpendVsLeft>

      <SpendVsLeft>
        <Column>
          <AmountLabel style={{ color: theme.incomeColor }}>{planned}</AmountLabel>
          <AmountText style={{ color: theme.incomeColor }}>{t('pages.budget.summary.chart.planned')}</AmountText>
        </Column>

        <LastColumn>
          <AmountLabel style={{ color: theme.savingColor }}>{left}</AmountLabel>
          <AmountText style={{ color: theme.savingColor }}>{t('pages.budget.summary.chart.left')}</AmountText>
        </LastColumn>
      </SpendVsLeft>
      <SpendVsLeft>
        <Column>
          <AmountLabel style={{ color: theme.colors.primary }}>{notBudgetedAmount}</AmountLabel>
          <AmountText style={{ color: theme.colors.primary }}>{t('pages.budget.summary.chart.not_budgeted')}</AmountText>
        </Column>
      </SpendVsLeft>
    </Container>
  )
}