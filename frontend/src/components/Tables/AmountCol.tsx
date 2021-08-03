import React from 'react'
import styled from 'styled-components/native'
import { DataTable, Text } from 'react-native-paper'
import { Money } from '../../api/graphql'
import { useFormatMoney } from '../../helpers/currency'

type Type = 'income' | 'expense' | 'difference'

interface IContentProps {
  type: Type
}

interface IAmountColProps {
  money: Money
  type: Type
}

function getTextColor({ theme, type } : any) {
  if (type === 'income') {
    return theme.incomeColor
  } else if (type === 'expense') {
    return theme.expenseColor
  } else {
    return theme.colors.text
  }
}

const Content = styled(Text)`
  color: ${(props : IContentProps) => getTextColor(props)};
`

export default function AmountCol({ money, type } : IAmountColProps) {
  const amount = useFormatMoney(money, false, true, 0)

  return (
    <DataTable.Cell numeric>
      <Content type={type}>{amount}</Content>
    </DataTable.Cell>
  )
}