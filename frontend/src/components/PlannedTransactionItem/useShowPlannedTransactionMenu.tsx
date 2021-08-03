import React from 'react'
import { useCallback } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { Series } from '../../api/graphql'
import useActionSheet from '../../helpers/useActionSheet'

interface IUseShowPlannedTransactionMenuArgs {
  onIgnorePlannedTransaction(seriesId : string, date : string)
  onEditPlannedTransaction(seriesId : string, date : string)
}

export default function useShowPlannedTransactionMenu(opts : IUseShowPlannedTransactionMenuArgs) {
  const showActionSheetWithOptions = useActionSheet()
  const { t } = useTranslation()
  const theme = useTheme()

  return useCallback((series: Series, date? : string) => {
    const {
      onIgnorePlannedTransaction,
      onEditPlannedTransaction
    } = opts

    showActionSheetWithOptions({
      icons: [
        <MaterialCommunityIcons color={theme.colors.text} size={24} name='calendar-remove' />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="calendar-edit" />,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="cancel" />
      ],
      options: [
        t('actions.planned_transaction.ignore'),
        t('actions.planned_transaction.edit_series'),
        t('actions.planned_transaction.cancel')
      ],
      cancelButtonIndex: 2,
    }, (option) => {
      switch(option) {
        case 0: // Ignore
          onIgnorePlannedTransaction(series.id, date)
        break;

        case 1:
          onEditPlannedTransaction(series.id, date)
        break
      }
    })
  }, opts)
}