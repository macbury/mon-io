import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native-paper'
import { useFormatMoney } from '../../helpers/currency'
import { Money, LocationSummary } from '../../api/graphql'

const AmountText = styled(Text)`
  color: #fff;
`

type CurrentEl = {
  props: {
    summary: LocationSummary
  }
}

const SummaryMarker = styled.View`
  position: absolute;
  top: -40px;
  left: -40px;
  width: 80px;
  height: 80px;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.mapExpense};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.colors.mapExpenseBorder};
`

export function LocationMarker({ summary }) {
  const amount = useFormatMoney(summary.amount, true, true, 0)

  return (
    <SummaryMarker>
      <AmountText>
        {amount}
      </AmountText>
    </SummaryMarker>
  )
}

export function AmountMarker({ amount }) {
  const price = useFormatMoney(amount, true, true, 0)

  return (
    <SummaryMarker>
      <AmountText>
        {price}
      </AmountText>
    </SummaryMarker>
  )
}

export function ClusterAmount({ items }) {
  const amount = useMemo(() => (items.reduce((acc : Money, currentEl : CurrentEl) => ({
    cents: acc.cents + currentEl.props.summary.amount.cents,
    currency: currentEl.props.summary.amount.currency,
  }), { cents: 0 })), [items])

  return <AmountMarker amount={amount} />
}