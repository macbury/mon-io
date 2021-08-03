import React, { useMemo } from 'react'
import moment from 'moment-timezone'
import { DataTable, Text } from 'react-native-paper'
import styled from 'styled-components/native'
import { Summary } from '../../api/graphql'
import AmountCol from './AmountCol'

interface IIncomeExpenseDiffTableProps {
  summaries: Summary[]
  timezoneName: string
}

const Container = styled.View`
  margin: 0 15px;
  margin-bottom: 15px;
`

export default function IncomeExpenseDiffTable({ summaries, timezoneName } : IIncomeExpenseDiffTableProps) {
  const items = useMemo(() => summaries.map((summary) => {
    const date = moment(summary.date).tz(timezoneName)
    return (
      <DataTable.Row key={summary.date}>
        <DataTable.Cell>{date.format('MMM YYYY')}</DataTable.Cell>
        <AmountCol
          type="expense"
          money={summary.expense} />
        <AmountCol
          type="income"
          money={summary.income} />
        <AmountCol
          type="difference"
          money={summary.difference} />
      </DataTable.Row>
    )
  }), [summaries])

  return (
    <Container>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title numeric>Expense</DataTable.Title>
          <DataTable.Title numeric>Income</DataTable.Title>
          <DataTable.Title numeric>Difference</DataTable.Title>
        </DataTable.Header>

        {items}
      </DataTable>
    </Container>
  )
}