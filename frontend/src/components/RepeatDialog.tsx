import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal } from 'react-native-paper'
import styled from 'styled-components/native'
import { List, RadioButton } from 'react-native-paper'
import { Recurrence } from '../api/graphql'

interface IRepeatDialogProps {
  visible: boolean
  removeNone?: boolean
  recurrence: Recurrence
  onChange(recurrence: Recurrence)
  onDismiss()
}

const Container = styled(Dialog)`
  max-width: 400px;
  min-width: 300px;
  display: flex;
  align-self: center;
  flex-shrink: 1;
  margin-top: 20px;
  margin-bottom: 20px;
`

const InnerScroll = styled.ScrollView`
  flex: 1;
  min-height: 400px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const InitialOptions = [
  Recurrence.Once,
  Recurrence.Everyday,
  Recurrence.EveryTwoDays,
  Recurrence.Weekdays,
  Recurrence.Weekends,
  Recurrence.EveryWeek,
  Recurrence.EveryTwoWeeks,
  Recurrence.EveryFourWeeks,
  Recurrence.EveryMonth,
  Recurrence.EveryTwoMonths,
  Recurrence.EveryThreeMonths,
  Recurrence.EverySixMonths,
  Recurrence.EveryYear,
]

const AllOptions = [
  Recurrence.None,
  ...InitialOptions
]

export default function RepeatDialog({ onDismiss, removeNone, visible, recurrence, onChange } : IRepeatDialogProps) {
  const { t } = useTranslation()
  const options = removeNone ? InitialOptions : AllOptions

  const items = options.map((key) => {
    const onPress = () => onChange(key)
    const radio = (
      <RadioButton
        value="first"
        status={recurrence === key ? 'checked' : 'unchecked'}
        onPress={onPress} />
    )
    return (
      <List.Item
        title={t(`dialogs.recurrence.actions.${key}`)}
        onPress={onPress}
        left={props => radio}
      />
    )
  })

  return (
    <Portal>
      <Container visible={visible} onDismiss={onDismiss} dismissable>
        <Dialog.Title>{t('dialogs.recurrence.title')}</Dialog.Title>
        <InnerScroll>
          {items}
        </InnerScroll>
      </Container>
    </Portal>
  )
}