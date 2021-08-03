import React from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { TouchableRipple, Text } from 'react-native-paper'
import Icon from '../../components/Icon'

const Button = styled(TouchableRipple)`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
  min-height: 56px;
  justify-content: center;
  padding-left: 13px;
`

const Inner = styled.View`
  flex-direction: row;
  align-items: center;
`

const Label = styled(Text)`
  font-size: 16px;
  margin-left: 10px;
`

export interface IShareCalendarButtonProps {
  onPress();
}

export default function ShareCalendarButton({ onPress, ...props } : IShareCalendarButtonProps) {
  const { t } = useTranslation()

  return (
    <Button onPress={onPress} {...props}>
      <Inner>
        <Icon name="MaterialCommunityIcons:calendar-sync" size={24} />
        <Label>{t('pages.series.menu.get_calendar_url')}</Label>
      </Inner>
    </Button>
  )
}