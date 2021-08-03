import React, { useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import moment from 'moment-timezone'
import { List, IconButton, Headline, Subheading } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'

import { settingsApiExplorerPath } from '../../helpers/urls'
import { Session } from '../../api/graphql'

import WideContainer from '../../components/layout/WideContainer'
import FullPageLoader from '../../components/layout/FullPageLoader'
import CenteredScroll from '../../components/CenteredScroll'
import Fab from '../../components/Fab'
import EmptyListInformation from '../../components/EmptyListInformation'

import { useStoreData } from '../../stores'

const HeaderContainer = styled.View`
  padding: 17px 17px 17px 20px;
`

function useRefreshTokens() {
  return useStoreData(({ screens: { sessions } }) => {
    return {
      fetch: sessions.fetch,
      destroy: sessions.destroy,
      createNewToken: sessions.createNewToken,

      refreshTokens: sessions.refreshTokens,
      longLivingRefreshTokens: sessions.longLivingRefreshTokens,
      isLoading: sessions.isLoading
    }
  })
}

function useBuildItemList(tokens : Session[], destroy, navigation) {
  return useMemo(() => tokens.map((session) => {
    const updatedAt = moment(session.updatedAt).format('YYYY-MM-DD H:mm')
    const navigateToApiExplorer = navigation ? () => navigation.navigate(settingsApiExplorerPath(session.id)) : null

    return (
      <List.Item
        key={session.id}
        title={session.name}
        onPress={navigateToApiExplorer}
        description={`${updatedAt} - ${session.ip}`}
        right={() => <IconButton icon="trash-can" onPress={() => destroy(session.id)} /> }
        left={() => <List.Icon icon={navigation ? 'code-braces' : "web"} />} />
    )
  }), [tokens, destroy])
}

function RefreshTokensScreen({ navigation } : NavigationInjectedProps) {
  const { t } = useTranslation()
  const {
    fetch,
    destroy,
    createNewToken,
    isLoading,
    refreshTokens,
    longLivingRefreshTokens,
  } = useRefreshTokens()

  useEffect(() => {
    fetch()
  }, [fetch])

  const refreshTokenItems = useBuildItemList(refreshTokens, destroy, null)
  const longLivingRefreshItems = useBuildItemList(longLivingRefreshTokens, destroy, Platform.OS === 'web' ? navigation : null)

  if (isLoading) {
    return <FullPageLoader />
  }

  return (
    <WideContainer>
      <CenteredScroll fab>
        <List.Section>
          <HeaderContainer>
            <Headline>{t('pages.refresh_token.refresh_token.title')}</Headline>
            <Subheading>{t('pages.refresh_token.refresh_token.about')}</Subheading>
          </HeaderContainer>
          {refreshTokenItems}

          <HeaderContainer>
            <Headline>{t('pages.refresh_token.long_lived_access_tokens.title')}</Headline>
            <Subheading>{t('pages.refresh_token.long_lived_access_tokens.about')}</Subheading>
          </HeaderContainer>
          <EmptyListInformation items={longLivingRefreshItems} title={t('pages.refresh_token.long_lived_access_tokens.empty')} />
          {longLivingRefreshItems}
        </List.Section>
      </CenteredScroll>
      <Fab loading={false} navbar form icon="plus" onPress={createNewToken} />
    </WideContainer>
  )
}

// @ts-ignore
RefreshTokensScreen.navigationOptions = props => ({
  title: 'pages.refresh_token.title'
})

export default RefreshTokensScreen