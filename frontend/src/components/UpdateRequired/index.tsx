import React, { useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Headline, Button, Paragraph } from 'react-native-paper'
import styled from 'styled-components/native'
import RNRestart from 'react-native-restart'
import onAppStateActive from '../../helpers/useAppState'
import { NotificationModule } from '../../modules/NotificationModule'
import { useStoreData } from '../../stores'

const Container = styled.View`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.windowBackground};
`

const Inner = styled.View`
  align-items: center;
  padding: 10px 25px;
`

interface IProgress {
  progress: number;
}

const ProgressBarContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 10px;
  height: 14px;
  background: ${({ theme }) => theme.budgetProgressBackgroundColor};
  border-radius: 8px;
  border-width: 1px;
  overflow: hidden;
  display: flex;
  width: 80%;
  border-color: ${({ theme }) => theme.budgetProgressBorderColor};
`

const ProgressValue = styled.View`
  height: 14px;
  background: ${({ theme }) => theme.budgetColor};
  width: ${(props : IProgress) => props.progress}%;
`

function useUpdater() {
  const { state, downloadProgress, check } = useStoreData(({ ui: { softwareUpdate } }) => ({
    state: softwareUpdate.refreshState,
    downloadProgress: softwareUpdate.progress,
    check: softwareUpdate.check
  }))

  const checkIfUserTappedTheUpdateNotification = useCallback(async () => {
    const extras = await NotificationModule.getIntentResults()

    const forceTriggerUpdate = extras.find(({ forceTriggerUpdate }) => forceTriggerUpdate)
    if (forceTriggerUpdate) {
      check(true)
    }
  }, [check])

  onAppStateActive(checkIfUserTappedTheUpdateNotification)

  useEffect(() => {
    check()
  }, [check])

  return {
    state,
    downloadProgress
  }
}

export default function UpdateRequired({ children }) {
  const { t } = useTranslation()
  const {
    state,
    downloadProgress
  } = useUpdater()

  if (state === 'UpToDate') {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }

  return (
    <Container>
      <Inner>
        <Headline>{t('errors.update.title')}</Headline>
        <Paragraph>{t('errors.update.about')}</Paragraph>
        <ProgressBarContainer>
          <ProgressValue progress={downloadProgress} />
        </ProgressBarContainer>
        {state === 'Downloading' && <ActivityIndicator size="large" />}
        {state === 'ReadyToInstall' && <Button onPress={() => RNRestart.Restart()}>{t('errors.update.restart')}</Button>}
      </Inner>
    </Container>
  )
}