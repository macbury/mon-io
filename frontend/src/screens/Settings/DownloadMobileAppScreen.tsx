import React from 'react'
import { Linking } from 'react-native'
import QRCode from 'react-qr-code'
import { Headline, Paragraph, Button, TextInput } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'

import { settingsAuthorizeDevicePath } from '../../helpers/urls'
import WideContainer from '../../components/layout/WideContainer'
import FullPageLoader from '../../components/layout/FullPageLoader'
import { useSettings } from './hooks'

const QrContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  padding-bottom: 20px;
`

const QrBorder = styled.View`
  padding: 20px;
  background: #fff;
  margin: 15px 0px;
`

const StyledHeadline = styled(Headline)`
  margin-top: 50px;
`

const ScrollContainer = styled.ScrollView`
  flex: 1;
`

const StyledButton = styled(Button)`
  margin-top: 15px;
  margin-bottom: 15px;
`

const Gap = styled.View`
  height: 20px;
`

const TokenTextField = styled(TextInput)`
  width: 50%;
`

function DownloadMobileAppScreen({ navigation } : NavigationInjectedProps) {
  const { loading, downloadApkUrl } = useSettings()
  const { t } = useTranslation()

  if (loading) {
    return (
      <FullPageLoader />
    )
  }
  return (
    <WideContainer>
      <ScrollContainer>
        <QrContainer>
          <StyledHeadline>{t('pages.repo.step_2.title')}</StyledHeadline>
          <Paragraph>{t('pages.repo.step_2.summary')}</Paragraph>
          <QrBorder>
            <QRCode size={512} value={downloadApkUrl || ''} />
          </QrBorder>

          <TokenTextField
            mode='outlined'
            numberOfLines={1}
            editable={false}
            value={downloadApkUrl}
          />

          <StyledButton mode="contained" onPress={() => Linking.openURL(downloadApkUrl)}>
            {t('pages.repo.download')}
          </StyledButton>

          <StyledHeadline>{t('pages.repo.step_3.title')}</StyledHeadline>
          <StyledButton
            mode="contained"
            onPress={() => navigation.navigate(settingsAuthorizeDevicePath())}>
              {t('pages.repo.step_3.button')}
          </StyledButton>

          <Gap />
        </QrContainer>
      </ScrollContainer>
    </WideContainer>
  )
}

// @ts-ignore
DownloadMobileAppScreen.navigationOptions = props => ({
  title: 'pages.repo.title'
})

export default DownloadMobileAppScreen