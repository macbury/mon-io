import React from 'react'
import { Money } from '../api/graphql'
import { useMoneyParts } from '../helpers/currency'
import { Text } from 'react-native-paper'
import styled, { DefaultTheme } from 'styled-components/native'

const Container = styled.View`
  display: flex;
  flex-direction: row;
`

interface IMoneyPart {
  expense?: boolean | number
  theme: DefaultTheme
  size: number;
}

function getTextExpenseTextColor({ theme, expense } : IMoneyPart) {
  return expense ? theme.expenseColor : theme.colors.text
}

const Dollars = styled(Text)`
  font-weight: bold;
  font-size: ${(prop : IMoneyPart) => prop.size}px;
  color: ${getTextExpenseTextColor};
`

const Cents = styled(Text)`
  font-size: ${(prop : IMoneyPart) => prop.size - 6}px;
  font-weight: bold;
  color: ${getTextExpenseTextColor};
`

const CurrencySymbol = styled(Text)`
  font-weight: bold;
  font-size: ${(prop : IMoneyPart) => prop.size}px;
  margin-left: 10px;
  opacity: 0.3;
`

export interface ICurrencyProps {
  amount: Money
  size: number
  showCurrency?: boolean
}

export default function Currency({ amount, size, showCurrency, ...props } : ICurrencyProps) {
  const [dollars, cents, currency] = useMoneyParts(amount)
  const dollarsWithSpaces = Math.abs(dollars as number).toLocaleString('en').split(/\-/).join(' ')
  const expense = dollars < 0
  const sign = expense ? '- ' : ''

  return (
    <Container {...props}>
      <Dollars expense={expense ? 1 : 0} size={size}>{sign}{dollarsWithSpaces}.</Dollars>
      <Cents expense={expense ? 1 : 0} size={size}>{cents}</Cents>
      <CurrencySymbol size={size}>{currency}</CurrencySymbol>
    </Container>
  )
}