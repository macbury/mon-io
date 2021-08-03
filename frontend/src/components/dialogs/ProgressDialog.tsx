import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { Text, Dialog, Portal } from 'react-native-paper'
import styled, { useTheme } from 'styled-components/native'
import DialogContainer from '../DialogContainer'
import { useStoreData } from '../../stores'

const Container = styled(DialogContainer)`
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  min-width: 320px;
  flex-direction: row;
  align-self: center;
  padding: 20px 30px;
  align-items: center;
`

const Title = styled(Text)`
  text-align: center;
  font-size: 16px;
  margin-left: 20px;
`


function useProgressDialogStore() {
  return useStoreData(({ ui: { progressDialog } }) => ({
    titleKey: progressDialog.titleKey,
    visible: progressDialog.visible
  }))
}

export default function ProgressDialog() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const {
    titleKey,
    visible
  } = useProgressDialogStore()

  return (
    <Portal>
      <Container visible={visible} onDismiss={() => null}>
        <ActivityIndicator size={48} color={colors.text} />
        <Title>{t(titleKey)}</Title>
      </Container>
    </Portal>
  )
}