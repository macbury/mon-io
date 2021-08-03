import React from 'react'
import { useTranslation } from 'react-i18next'
import Chip from './Chip'

export interface IAddMetadataProps {
  onPress()
}

export default function AddMetadata({ onPress } : IAddMetadataProps) {
  const { t } = useTranslation()
  return (
    <Chip icon="plus" onPress={onPress}>{t('metadata.add')}</Chip>
  )
}