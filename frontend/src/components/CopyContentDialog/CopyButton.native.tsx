import React, { useCallback } from 'react'
import { Button } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { ICopyButtonProps } from './types'
import Share from 'react-native-share'

export default function CopyButton({ content } : ICopyButtonProps) {
  const { t } = useTranslation()
  const onPress = useCallback(() => {
    Share.open({
      message: content
    })
  }, [content])

  return (
    <Button mode="contained" onPress={onPress}>{t('dialogs.share_calendar.copy')}</Button>
  )
}