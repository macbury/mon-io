import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { ICopyButtonProps } from './types'

export default function CopyButton({ content } : ICopyButtonProps) {
  const { t } = useTranslation()

  return (
    <CopyToClipboard text={content} on>
      <Button mode="contained" onPress={() => null}>{t('dialogs.share_calendar.copy')}</Button>
    </CopyToClipboard>
  )
}