import React, { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { TransactionCategoryKind, Currency } from '../../api/graphql'

interface IAmountProps {
  amount : number | string;
  currency : Currency;
  type: TransactionCategoryKind;
  onChangeAmount(content : string)
  onBeginChange()
}

const Container = styled.View`
  border: 1px solid ${(props) => props.theme.itemBorderColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ITypeProps {
  type: TransactionCategoryKind;
  theme?: DefaultTheme
}

function typeToColor({ type, theme } : ITypeProps) {
  if (type === TransactionCategoryKind.Saving) {
    return theme.savingColor
  } else if (type === TransactionCategoryKind.Income || type === TransactionCategoryKind.Deposit) {
    return theme.incomeColor
  } else {
    return theme.expenseColor
  }
}

const TypeText = styled(Text)`
  color: ${typeToColor};
`

const AmountText = styled.TextInput`
  color: ${typeToColor};
  font-size: 36px;
  text-align: center;
  padding: 0px;
  margin: 0px;
`

export default function Amount({ amount, currency, type, onChangeAmount, onBeginChange } : IAmountProps) {
  const [currentValue, setCurrentValue] = useState(amount as string)
  const { t } = useTranslation()

  useEffect(() => {
    setCurrentValue(`${amount} ${currency.symbol}`)
  }, [amount, currency])

  const informAboutChangedAmount = useCallback(() => {
    onChangeAmount(currentValue)
  }, [onChangeAmount, currentValue])

  return (
    <Container>
      <TypeText type={type}>{t(`form.transaction.amount.${type}`)}</TypeText>
      <AmountText
        keyboardType={Platform.OS === "web" ? 'default' : 'numeric'}
        onBlur={informAboutChangedAmount}
        onFocus={onBeginChange}
        onChangeText={setCurrentValue}
        type={type}
        value={currentValue} />
    </Container>
  )
}