import React, { useMemo } from 'react'
import { Moment } from 'moment-timezone'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import { Text, TouchableRipple } from 'react-native-paper'
import { Recurrence } from '../../api/graphql'
import Icon from '../Icon'

interface ISeriesDateProps {
  selectedDate: Moment
  endAt: Moment
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

export default function SeriesDate({ selectedDate, endAt, recurrence, onPress } : ISeriesDateProps) {
  const theme = useTheme()
  const formattedSelectedTime = useMemo(() => (selectedDate.format("MMM Do YYYY")), [selectedDate])
  const formattedEndTime = useMemo(() => (endAt?.format("MMM Do YYYY")), [endAt])

  const { t } = useTranslation()

  return (
    <TouchableRipple onPress={onPress}>
      <Container>
        <Value>
          <Icon name="MaterialCommunityIcons:calendar-today" color={theme.colors.text} size={18} />
          {formattedSelectedTime} {formattedEndTime && t('series_date.to', { endTime: formattedEndTime })}
        </Value>
        <Value>
          <Icon name="MaterialIcons:repeat" color={theme.colors.text} size={18} />
          {t(`dialogs.recurrence.actions.${recurrence}`)}
        </Value>
      </Container>
    </TouchableRipple>
  )
}