import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { RadioButton, Text, TouchableRipple } from 'react-native-paper'
import { Currency } from '../../api/graphql'
import { IOnCurrencySelect } from './shared'

const Inner = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`

const Name = styled(Text)`
  flex: 1;
  padding-right: 15px;
`

const Symbol = styled(Text)`
  opacity: 0.4;
  font-weight: bold;
`

interface IItemProps extends IOnCurrencySelect {
  currency: Currency
  selected?: boolean
}

export default function Item({ currency, selected, onCurrencySelect } : IItemProps) {
  const onCurrencyPress = useCallback(() => onCurrencySelect(currency), [currency, onCurrencySelect])

  return (
    <TouchableRipple onPress={onCurrencyPress}>
      <Inner>
        <RadioButton
          value="first"
          status={selected ? 'checked' : 'unchecked'}
          onPress={onCurrencyPress}
        />
        <Name numberOfLines={1}>{currency.name}</Name>
        <Symbol>{currency.symbol}</Symbol>
      </Inner>
    </TouchableRipple>
  )
}