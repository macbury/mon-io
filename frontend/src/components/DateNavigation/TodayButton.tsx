import React, { useCallback } from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import moment, { Moment } from 'moment-timezone'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import Icon from '../Icon'

const SelectDateButton = styled(TouchableRipple)`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-width: 300px;
`

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

interface IDateTextProps {
  theme?: DefaultTheme
  today: boolean
}

const DateText = styled(Text)`
  margin-left: 10px;
  color: ${({ theme, today } : IDateTextProps) => today ? theme.colors.primary : theme.colors.text};
`

interface ITodayButtonProps {
  today: boolean
  selectedDate: Moment
  onChangeDate(date : Moment)
}

function TodayButton({ navigation, selectedDate, today, onChangeDate } : ITodayButtonProps & NavigationInjectedProps) {
  const goToToday = useCallback(() => {
    navigation.navigate(onChangeDate(moment()))
  }, [navigation, onChangeDate])

  const theme = useTheme()
  const currentIcon = today ? "MaterialCommunityIcons:calendar" : "MaterialCommunityIcons:calendar-month"

  return (
    <SelectDateButton onPress={goToToday}>
      <Container>
        <Icon
          color={today ? theme.colors.primary : theme.colors.icon}
          name={currentIcon}
          size={20}/>
        <DateText today={today}>{selectedDate.format('MMMM YYYY')}</DateText>
      </Container>
    </SelectDateButton>
  )
}

export default withNavigation(TodayButton)