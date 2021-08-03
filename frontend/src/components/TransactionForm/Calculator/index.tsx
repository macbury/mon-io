import React, { useMemo } from 'react'
import Color from 'color'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import Button from './Button'
import useKeyDown from '../../../helpers/useKeyDown'
import { Currency } from '../../../api/graphql'

export type TDialogMode = 'date' | 'budget' | 'series'

const numbers = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3']
]

const Container = styled.KeyboardAvoidingView`
  display: flex;
  flex: 0.8;
  min-height: 240px;
  max-height: 260px;
  flex-direction: row;

`

const Numbers = styled.View`
  display: flex;
  flex: 3;
  flex-direction: column;
`

const Operations = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Row = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
`

interface ICalculatorProps {
  primaryColor: string;
  valid?: boolean;
  hasOperation?: boolean;
  currency: Currency;
  mode: TDialogMode
  
  onDigitPress(char:any);
  onOperatorPress(char:any);
  onBackspacePress()
  onSumOrAcceptPress()
  onDatePickerPress?()
  onMagicWandPress?()
  onChangeCurrencyPress?()
}

export default function Calculator(props : ICalculatorProps) {
  const theme = useTheme()

  let {
    primaryColor,
    valid,
    mode,
    hasOperation,

    onDigitPress,
    onOperatorPress,
    onBackspacePress,
    onSumOrAcceptPress,
    onDatePickerPress,
    onChangeCurrencyPress,
    onMagicWandPress,
    currency,
    ...rest
  } = props

  if (!primaryColor) {
    primaryColor = theme.colors.accent
  }

  const altBackgroundColor = theme.calculatorAltBackground
  const rippleColor = useMemo(() => (Color(primaryColor).fade(0.7).string()), [primaryColor])

  useKeyDown((key) => {
    if (key === 'Enter' || key === '=') {
      onSumOrAcceptPress()
    } if (key === 'Backspace') {
      onBackspacePress()
    } if (isNaN(parseInt(key)) && key !== '.' && key !== ',') {
      if (key === '-' || key === '/' || key === '*' || key === '+') {
        onOperatorPress(key)
      }
    } else {
      onDigitPress(key)
    }
  })

  return (
    <Container {...rest}>
      <Operations>
        <Button
          onPress={onOperatorPress}
          icon="MaterialCommunityIcons:division"
          rippleColor={rippleColor}
          char="/"
          primaryColor={altBackgroundColor} />
        <Button
          onPress={onOperatorPress}
          icon="MaterialCommunityIcons:multiplication"
          rippleColor={rippleColor}
          char="*"
          primaryColor={altBackgroundColor} />
        <Button
          onPress={onOperatorPress}
          icon="MaterialCommunityIcons:minus"
          rippleColor={rippleColor}
          char="-"
          primaryColor={altBackgroundColor}/>
        <Button
          onPress={onOperatorPress}
          icon="MaterialCommunityIcons:plus"
          rippleColor={rippleColor}
          char="+"
          primaryColor={altBackgroundColor} />
      </Operations>
      <Numbers>
        {numbers.map((row, i) =>
          <Row key={i}>
            {row.map(char =>
              <Button onPress={onDigitPress} rippleColor={rippleColor} key={char} char={char} />
            )}
          </Row>
        )}

        <Row>
          {onChangeCurrencyPress && <Button onPress={onChangeCurrencyPress} rippleColor={rippleColor} char={currency.symbol} />}
          <Button onPress={onDigitPress} fill={!onChangeCurrencyPress} rippleColor={rippleColor} char={'0'} />
          <Button onPress={onDigitPress} rippleColor={rippleColor} char={'.'} />
        </Row>
      </Numbers>
      <Operations>
        <Button onPress={onBackspacePress}
          rippleColor={rippleColor}
          icon="MaterialCommunityIcons:backspace"
          primaryColor={altBackgroundColor} />
        {mode === 'series' && <Button onPress={onDatePickerPress}
          rippleColor={rippleColor}
          icon="MaterialCommunityIcons:calendar-edit"
          primaryColor={altBackgroundColor} />}
        {mode === 'date' && <Button onPress={onDatePickerPress}
          rippleColor={rippleColor}
          icon="MaterialCommunityIcons:calendar-clock"
          primaryColor={altBackgroundColor} />}
        {mode === 'budget' && <Button onPress={onMagicWandPress}
          rippleColor={rippleColor}
          icon="FontAwesome:magic"
          primaryColor={altBackgroundColor} />}
        <Button onPress={onSumOrAcceptPress}
          fill={2}
          action={true}
          disabled={!valid}
          icon={hasOperation ? "MaterialCommunityIcons:equal" : "MaterialIcons:check"}
          primaryColor={primaryColor} />
      </Operations>
    </Container>
  )
}