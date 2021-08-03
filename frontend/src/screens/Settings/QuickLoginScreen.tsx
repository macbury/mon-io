import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'
import QRCode from 'react-qr-code'
import { Paragraph, TextInput } from 'react-native-paper'

import WideContainer from '../../components/layout/WideContainer'
import FullPageLoader from '../../components/layout/FullPageLoader'

import { useSettings } from './hooks'

const QrContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const QrBorder = styled.View`
  padding: 20px;
  background: #fff;
  margin-bottom: 10px;
`

const TokenTextField = styled(TextInput)`
  width: 80%;
`

function QuickLoginScreen({ navigation } : NavigationInjectedProps) {
  const { quickLoginUrl, refreshQuickLoginToken } = useSettings()
  const { t } = useTranslation()

  useEffect(() => {
    if (!quickLoginUrl) {
      refreshQuickLoginToken()
    }
    const timer = setTimeout(() => { refreshQuickLoginToken() }, 10000)
    // load expiration from the token and set refresh one second before
    return () => clearTimeout(timer)
  }, [quickLoginUrl])

  if (!quickLoginUrl) {
    return <FullPageLoader />
  }

  return (
    <WideContainer>
      <QrContainer>
        <QrBorder>
          <QRCode size={512} value={quickLoginUrl} />
        </QrBorder>
        <TokenTextField
          mode='outlined'
          multiline={true}
          numberOfLines={2}
          editable={false}
          value={quickLoginUrl}
        />

        <Paragraph>{t('pages.quick_login.qr_code')}</Paragraph>
      </QrContainer>
    </WideContainer>
  )
}

// @ts-ignore
QuickLoginScreen.navigationOptions = props => ({
  title: 'pages.quick_login.title'
})

export default QuickLoginScreen