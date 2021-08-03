import React, { useEffect, useState, useCallback } from 'react'
import { Portal } from 'react-native-paper'
import { Moment } from 'moment-timezone'
import { useTranslation } from 'react-i18next'
import { Recurrence, RecurrenceUpdateMode, Series } from '../api/graphql'
import ActionDialog, { IAction } from '../components/ActionDialog'
import DatePickerDialog from '../components/DatePickerDialog'
import RepeatDialog from '../components/RepeatDialog'

interface ISeriesConfigurationDialog {
  series: Series
  recurrence: Recurrence
  visible?: boolean
  selectedDate: Moment
  recurrenceEndAt: Moment
  onChangeEndDate(date : Moment)
  onChangeDate(date : Moment)
  onDismiss()
  onChangeRecurrence(recurrence: Recurrence)
}

function subtitleDate(date : Moment) {
  return date?.format('YYYY-MM-DD') || '-'
}

export default function SeriesConfigurationDialog(props : ISeriesConfigurationDialog) {
  const {
    visible,
    selectedDate,
    recurrence,
    recurrenceEndAt,
    series,
    onDismiss,
    onChangeDate,
    onChangeRecurrence,
    onChangeEndDate
  } = props

  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false)
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false)
  const [repeatPickerVisible, setRepeatPickerVisible] = useState(false)
  const { t } = useTranslation()

  const onSuccessStartDate = useCallback((date) => {
    onChangeDate(date)
    onDismiss()
  }, [onChangeDate, onDismiss])

  const onSuccessEndDate = useCallback((date) => {
    onChangeEndDate(date)
    onDismiss()
  }, [onChangeEndDate, onDismiss])

  useEffect(() => {
    if (!visible) {
      setStartDatePickerVisible(false)
      setRepeatPickerVisible(false)
    }
  }, [visible, setStartDatePickerVisible, setRepeatPickerVisible])

  const items : IAction[] = [
    {
      title: t('dialogs.transaction_date_actions.actions.change'),
      icon: 'calendar-month',
      subtitle: subtitleDate(selectedDate),
      onPress: () => setStartDatePickerVisible(true)
    },
    {
      title: t('dialogs.transaction_date_actions.actions.repeat'),
      icon: 'repeat',
      subtitle: t(`dialogs.recurrence.actions.${recurrence}`),
      onPress: () => setRepeatPickerVisible(true)
    },
    {
      title: t('dialogs.transaction_date_actions.actions.set_end_date'),
      icon: 'calendar-arrow-right',
      subtitle: subtitleDate(recurrenceEndAt),
      hidden: recurrence === Recurrence.Once,
      onPress: () => setEndDatePickerVisible(true)
    },
  ]

  return (
    <Portal>
      <ActionDialog
        title={t('dialogs.edit_series.title')}
        items={items}
        visible={visible && (!startDatePickerVisible && !repeatPickerVisible && !endDatePickerVisible)}
        onDismiss={onDismiss}
      />
      <RepeatDialog
        removeNone={true}
        recurrence={recurrence}
        onChange={(recurrence) => {
          onChangeRecurrence(recurrence)
          setRepeatPickerVisible(false) 
        }}
        visible={repeatPickerVisible}
        onDismiss={() => { setRepeatPickerVisible(false) }}
      />
      <DatePickerDialog
        date={selectedDate}
        visible={startDatePickerVisible}
        onSuccess={onSuccessStartDate}
        onDismiss={() => { setStartDatePickerVisible(false) }} />
      <DatePickerDialog
        date={recurrenceEndAt}
        visible={endDatePickerVisible}
        onSuccess={onSuccessEndDate}
        onDismiss={() => { setEndDatePickerVisible(false) }} />
    </Portal>
  )
}