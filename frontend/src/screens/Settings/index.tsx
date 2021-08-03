import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, Linking } from 'react-native'

import { NavigationInjectedProps } from 'react-navigation'
import { List } from 'react-native-paper'

import { useModalScreenBar } from '../../helpers/useSetNavBarColor'
import tabBarIcon from '../../hoc/tabBarIcon'
import WideContainer from '../../components/layout/WideContainer'
import LinkItem from '../../components/Settings/LinkItem'
import FullPageLoader from '../../components/layout/FullPageLoader'
import CenteredScroll from '../../components/CenteredScroll'

import { settingsAuthorizeDevicePath, settingsDownloadMobileAppPath, settingsRefreshTokensPath } from '../../helpers/urls'
import { useSession, useSettings, useAbout } from './hooks'

function SettingsScreen({ navigation } : NavigationInjectedProps) {
  const { logout, loggingOut, accessToken } = useSession()
  const { mainCurrency, downloadBackupUrl, themeMode, changeThemeMode } = useSettings()
  const { clientVersion, serverVersion, clientCommitSha, serverCommitSha } = useAbout()

  const { t } = useTranslation()

  useModalScreenBar()

  if (loggingOut) {
    return <FullPageLoader />
  }

  return (
    <WideContainer navbar>
      <CenteredScroll>
        <List.Section>
          <List.Subheader>{t('pages.settings.options.session.header')}</List.Subheader>
          {Platform.OS === 'web' && <LinkItem
            action={settingsAuthorizeDevicePath()}
            title={t('pages.settings.options.session.authorize_device')}
            icon="cellphone-link" />}
          {Platform.OS === 'web' && <LinkItem
            action={settingsDownloadMobileAppPath()}
            title={t('pages.settings.options.session.download_mobile_app')}
            icon="android" />}
          <LinkItem
            action={settingsRefreshTokensPath()}
            title={t('pages.settings.options.session.refresh_tokens')}
            description={t('pages.settings.options.session.refresh_tokens_about')}
            icon="key-change" />
          <List.Item
            title={t('pages.settings.options.session.logout')}
            onPress={() => logout()}
            left={props => <List.Icon {...props} icon="power-standby" />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>{t('pages.settings.options.main_settings.header')}</List.Subheader>
          <List.Item
            title={t('pages.settings.options.main_settings.theme.title')}
            description={t(`pages.settings.options.main_settings.theme.options.${themeMode || 'no-preference'}`)}
            onPress={() => void changeThemeMode()}
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title={t('pages.settings.options.main_settings.timezone')}
            description="Warsaw"
            onPress={() => { throw new Error('Boom!') }}
            left={props => <List.Icon {...props} icon="timer" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title={t('pages.settings.options.main_settings.currency')}
            description={mainCurrency?.name || '-'}
            onPress={() => console.log('eee')}
            left={props => <List.Icon {...props} icon="currency-usd" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title={t('pages.settings.options.main_settings.ocr')}
            description="eng+pln"
            onPress={() => console.log('eee')}
            left={props => <List.Icon {...props} icon="cube-scan" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>{t('pages.settings.options.users.header')}</List.Subheader>
          <List.Item
            title="macbury"
            onPress={() => console.log('eee')}
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title="ola"
            onPress={() => console.log('eee')}
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title={t('pages.settings.options.users.add')}
            onPress={() => console.log('eee')}
            left={props => <List.Icon {...props} icon="plus-circle" />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>{t('pages.settings.options.server.header')}</List.Subheader>
          <List.Item
            title={t('pages.settings.options.server.download_backup')}
            onPress={() => Linking.openURL(`${downloadBackupUrl}?token=${encodeURIComponent(accessToken)}`)}
            left={props => <List.Icon {...props} icon="database-export" />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>{t('pages.settings.options.about.header')}</List.Subheader>
          <List.Item
            title={t('pages.settings.options.about.client', { version: clientVersion })}
            description={`sha ${clientCommitSha}`}
            onPress={() => Linking.openURL(`https://github.com/macbury/mon.io/commit/${clientCommitSha}`)}
            left={props => <List.Icon {...props} icon="cellphone" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title={t('pages.settings.options.about.server', { version: serverVersion })}
            description={`sha ${serverCommitSha}`}
            onPress={() => Linking.openURL(`https://github.com/macbury/mon.io/commit/${serverCommitSha}`)}
            left={props => <List.Icon {...props} icon="language-ruby-on-rails" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
      </CenteredScroll>
    </WideContainer>
  )
}

// @ts-ignore
SettingsScreen.navigationOptions = props => ({
  title: 'pages.settings.title',
  tabBarIcon: tabBarIcon('settings'),
})

export default SettingsScreen