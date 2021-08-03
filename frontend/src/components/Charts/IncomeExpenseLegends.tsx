import React, { useCallback } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { List, Checkbox } from 'react-native-paper'
import { TransactionCategoryKind } from '../../api/graphql'

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 800px;
  align-self: center;
`

const Item = styled(List.Item)`
  width: 33%;
`

interface ILegendChartItemProps {
  color: string
}

const LegendItem = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  margin: 10px 5px;
  background-color: ${(props : ILegendChartItemProps) => props.color};
`

interface IIncomeExpenseLegendsProps {
  filters: {
    [key: string]: boolean
  }
  onToggle(kind : TransactionCategoryKind)
  onSelectOnly(kind : TransactionCategoryKind)
}

export default function IncomeExpenseLegends({ onToggle, onSelectOnly, filters } : IIncomeExpenseLegendsProps)  {
  const theme = useTheme()

  const onToggleIncome = useCallback(() => {
    onToggle(TransactionCategoryKind.Income)
  }, [onToggle])

  const onToggleExpenses = useCallback(() => {
    onToggle(TransactionCategoryKind.Expense)
  }, [onToggle])

  const onToggleDifference = useCallback(() => {
    onToggle(TransactionCategoryKind.Saving)
  }, [onToggle])

  return (
    <Container>
      <Item
        title="Income"
        onPress={onToggleIncome}
        left={props => <LegendItem color={theme.incomeColor} />}
        right={props => <Checkbox status={filters[TransactionCategoryKind.Income] ? 'checked' : 'unchecked'} onPress={onToggleIncome} />}
      />
      <Item
        title="Expenses"
        onPress={onToggleExpenses}
        left={props => <LegendItem color={theme.expenseColor} />}
        right={props => <Checkbox status={filters[TransactionCategoryKind.Expense] ? 'checked' : 'unchecked'} onPress={onToggleExpenses} />}
      />
      <Item
        title="Difference"
        onPress={onToggleDifference}
        left={props => <LegendItem color={theme.colors.text} />}
        right={props => <Checkbox status={filters[TransactionCategoryKind.Saving] ? 'checked' : 'unchecked'} onPress={onToggleDifference} />}
      />
    </Container>
  )
}