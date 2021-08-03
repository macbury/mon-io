import React, { useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useIsFocused } from 'react-navigation-hooks'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '../stores'

import WideContainer from '../components/layout/WideContainer'
import CenteredScroll from '../components/CenteredScroll'
import ImportItem from '../components/ImportItem'
import ErrorMessageContent from '../components/ErrorMessageContent'
import FullPageLoader from '../components/layout/FullPageLoader'
import { useDefaultScreenBar } from '../helpers/useSetNavBarColor'
import { editImportPath } from '../helpers/urls'

function useImports() {
  return useStoreData(({ screens: { imports } }) => ({
    all: imports.all,
    loading: imports.isLoading,
    refreshing: imports.isRefreshing,
    refresh: imports.refresh
  }))
}

export default function ImportScreens({ navigation }) {
  const { t } = useTranslation()
  const {
    all,
    loading,
    refreshing,
    refresh
  } = useImports()
  const isFocused = useIsFocused()
  useDefaultScreenBar()

  useEffect(() => {
    if (isFocused) {
      refresh()
    }
  }, [refresh, isFocused])

  if (loading) {
    return <FullPageLoader />
  }

  if (all === null || all?.length === 0) {
    return <ErrorMessageContent message={t('pages.imports.empty')} />
  }

  return (
    <WideContainer>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        data={all}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ImportItem importData={item} action={editImportPath(item.id)} />}
        renderScrollComponent={(props : any) => <CenteredScroll {...props} />}
      />
    </WideContainer>
  )
}

// @ts-ignore
ImportScreens.navigationOptions = props => ({
  title: 'pages.imports.title'
})