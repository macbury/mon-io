import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationInjectedProps } from 'react-navigation'
import WideContainer from '../../components/layout/WideContainer'
import Playground from './Playground'
import FullPageLoader from '../../components/layout/FullPageLoader'
import ErrorMessageContent from '../../components/ErrorMessageContent'
import { useStoreData } from '../../stores'


function useApiExplorer() {
  return useStoreData(({ session, screens: { apiExplorer } }) => ({
    endpoint: session.endpointUrl,
    accessToken: apiExplorer.accessToken,
    loading: apiExplorer.isLoading,
    notFound: apiExplorer.isNotFound,
    fetch: apiExplorer.fetch
  }))
}

export default function ApiExplorerScreen({ navigation } : NavigationInjectedProps) {
  const {
    endpoint,
    accessToken,
    loading,
    notFound,
    fetch
  } = useApiExplorer()

  const { t } = useTranslation()
  const refreshTokenId = navigation.getParam('refreshTokenId')

  useEffect(() => {
    fetch(refreshTokenId)
  }, [refreshTokenId, fetch])

  if (loading) {
    return <FullPageLoader />
  }

  if (notFound) {
    return <ErrorMessageContent message={t('pages.api_explorer.not_found')} />
  }

  return (
    <WideContainer>
      <Playground
        workspace={refreshTokenId}
        headers={{ Authorization: `Token token=${accessToken}` }}
        endpoint={endpoint} />
    </WideContainer>
  )
}

ApiExplorerScreen.navigationOptions = props => ({
  title: 'pages.api_explorer.title'
})