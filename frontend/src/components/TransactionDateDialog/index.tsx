import React, { useEffect, useState, useCallback } from 'react'
import { Portal } from 'react-native-paper'
import moment, { Moment } from 'moment-timezone'
import { useNavigation } from 'react-navigation-hooks'
import { useTranslation } from 'react-i18next'
import { Recurrence, RecurrenceUpdateMode, Series } from '../../api/graphql'
import ActionDialog, { IAction } from '../../components/ActionDialog'
import DatePickerDialog from '../../components/DatePickerDialog'
import RepeatDialog from '../../components/RepeatDialog'
import { editSeriesPath } from '../../helpers/urls'

interface ITransactionDateDialog {
  series: Series,
  isNewRecord: boolean
  recurrence: Recurrence
  visible?: boolean
  selectedDate: Moment
  onChangeDate(date : Moment);
  onDismiss()
  onChangeRecurrence(recurrence: Recurrence)
}

function subtitleDate(date : Moment) {
  return date.format('YYYY-MM-DD')
}

export default function TransactionDateDialog(props : ITransactionDateDialog) {
  const {
    visible,
    selectedDate,
    recurrence,
    isNewRecord,
    series,
    onDismiss,
    onChangeDate,
    onChangeRecurrence,
  } = props

  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [repeatPickerVisible, setRepeatPickerVisible] = useState(false)
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const today = moment()
  const yesterday = moment(today).subtract(1, 'day')

  const onSuccessDate = useCallback((date) => {
    onChangeDate(date)
    onDismiss()
  }, [onChangeDate, onDismiss])

  useEffect(() => {
    if (!visible) {
      setDatePickerVisible(false)
      setRepeatPickerVisible(false)
    }
  }, [visible, setDatePickerVisible, setRepeatPickerVisible])

  const items : IAction[] = [
    {
      title: t('dialogs.transaction_date_actions.actions.current'),
      icon: 'calendar',
      subtitle: subtitleDate(selectedDate),
      onPress: () => onSuccessDate(selectedDate)
    },
    {
      title: t('dialogs.transaction_date_actions.actions.today'),
      icon: 'calendar-today',
      subtitle: subtitleDate(today),
      onPress: () => onSuccessDate(today)
    },
    {
      title: t('dialogs.transaction_date_actions.actions.yesterday'),
      icon: 'calendar-minus',
      subtitle: subtitleDate(yesterday),
      onPress: () => onSuccessDate(yesterday)
    },
    {
      title: t('dialogs.transaction_date_actions.actions.custom'),
      icon: 'calendar-month',
      onPress: () => setDatePickerVisible(true)
    }
  ]

  if (series) {
    items.push({
      title: t('dialogs.transaction_date_actions.actions.series'),
      icon: 'repeat',
      subtitle: t(`dialogs.recurrence.actions.${recurrence}`),
      onPress: () => {
        onDismiss()
        navigate(editSeriesPath(series.id, RecurrenceUpdateMode.ThisAndFuture, selectedDate))
      }
    })
  } else if (isNewRecord) {
    items.push({
      title: t('dialogs.transaction_date_actions.actions.repeat'),
      icon: 'repeat',
      subtitle: t(`dialogs.recurrence.actions.${recurrence}`),
      onPress: () => setRepeatPickerVisible(true)
    })
  }

  return (
    <Portal>
      <ActionDialog
        title={t('dialogs.transaction_date_actions.title')}
        items={items}
        visible={visible && (!datePickerVisible && !repeatPickerVisible)}
        onDismiss={onDismiss}
      />
      <RepeatDialog
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
        onSuccess={onSuccessDate}
        visible={datePickerVisible}
        onDismiss={() => { setDatePickerVisible(false) }} />
    </Portal>
  )
}