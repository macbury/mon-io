import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components/native'
import { useNavigation } from 'react-navigation-hooks'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { Series, PlannedTransaction, Transaction, RecurrenceUpdateMode } from '../../api/graphql'
import useActionSheet from '../../helpers/useActionSheet'
import { SeriesTransaction } from './types'
import { editTransactionPath, editSeriesPath, newPlannedTransactionPath } from '../../helpers/urls'
import { useStoreData } from '../../stores'

function useSeriesStore() {
  return useStoreData(({ screens: { series } }) => ({
    ignoreDate: series.ignoreDate
  }))
}

export default function usePlannedTransactionActionSheet() {
  const showActionSheet = useActionSheet()
  const navigation = useNavigation()
  const theme = useTheme()
  const { t } = useTranslation()
  const { ignoreDate } = useSeriesStore()

  const showTransactionActionSheet = useCallback((series : Series, transaction : Transaction) => {
    showActionSheet({
      icons: [
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="file-edit" />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="calendar-edit" />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="calendar-arrow-right" />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="cancel" />
      ],
      options: [
        t('pages.edit_transaction.menu.show_transaction'),
        t('actions.planned_transaction.update_current'),
        t('actions.planned_transaction.update_future'),
        t('actions.planned_transaction.cancel')
      ],
      cancelButtonIndex: 2,
    }, (option) => {
      switch (option) {
        case 0:
          navigation.navigate(editTransactionPath(transaction.id))
        break;

        case 1:
          navigation.navigate(editSeriesPath(series.id, RecurrenceUpdateMode.OnlyThis, transaction.date))
        break;

        case 2:
          navigation.navigate(editSeriesPath(series.id, RecurrenceUpdateMode.ThisAndFuture, transaction.date))
        break;

        default:
          break;
      }
    })
    // show transaction
    // edit series
  }, [showActionSheet, theme, t, navigation])

  const showSeriesActionSheet = useCallback((series : Series, transaction : PlannedTransaction) => {
    showActionSheet({
      icons: [
        <MaterialCommunityIcons color={theme.colors.text} size={24} name='calendar-plus' />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name='calendar-remove' />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="calendar-edit" />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="calendar-arrow-right" />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="cancel" />
      ],
      options: [
        t('actions.planned_transaction.create'),
        t('actions.planned_transaction.ignore'),
        t('actions.planned_transaction.update_current'),
        t('actions.planned_transaction.update_future'),
        t('actions.planned_transaction.cancel')
      ],
      cancelButtonIndex: 4,
    }, (option) => {
      switch (option) {
        case 0:
          navigation.navigate(newPlannedTransactionPath(series.id, transaction.date))
        break;
        case 1:
          ignoreDate(series.id, transaction.date)
        break
        case 2:
          navigation.navigate(editSeriesPath(series.id, RecurrenceUpdateMode.OnlyThis, transaction.date))
        break;
        case 3:
          navigation.navigate(editSeriesPath(series.id, RecurrenceUpdateMode.ThisAndFuture, transaction.date))
        break;
      
        default:
          break;
      }
    })
  }, [showActionSheet, theme, t, navigation, ignoreDate])

  return useCallback((series : Series, transaction : SeriesTransaction) => {
    if (transaction.__typename === 'PlannedTransaction') {
      showSeriesActionSheet(series, transaction)
    } else {
      showTransactionActionSheet(series, transaction)
    }
  }, [showTransactionActionSheet])
}