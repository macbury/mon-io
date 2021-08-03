import React, { useMemo } from 'react'
import { Moment } from 'moment-timezone'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import { Text, TouchableRipple } from 'react-native-paper'
import { Recurrence } from '../../api/graphql'
import Icon from '../Icon'

interface ISelectedDateProps {
  date: Moment
  recurrence: Recurrence
  onPress()
}

const Container = styled.View`
  border: 1px solid ${(prop) => prop.theme.itemBorderColor};
  background: ${(prop) => prop.theme.calculatorAltBackground};
  padding: 10px;
  justify-content: space-around;
  align-content: center;
  flex-direction: row;
`

const Value = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  align-items: center;
  display: flex;
  flex-direction: row;
`

export default function SelectedDate({ date, recurrence, onPress } : ISelectedDateProps) {
  const formattedTime = useMemo(() => (date.format("MMM Do YYYY")), [date])
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <TouchableRipple onPress={onPress}>
      <Container>
        <Value>
          <Icon name="MaterialCommunityIcons:calendar-today" color={theme.colors.text} size={18} />
          {formattedTime}
        </Value>
        {recurrence && recurrence != Recurrence.None && <Value>
          <Icon name="MaterialIcons:repeat" color={theme.colors.text} size={18} />
          {t(`dialogs.recurrence.actions.${recurrence}`)}
        </Value>}
      </Container>
    </TouchableRipple>
  )
}