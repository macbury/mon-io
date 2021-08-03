import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { NavigationInjectedProps, ScrollView } from 'react-navigation'
import { useFocusEffect } from 'react-navigation-hooks'
import styled from 'styled-components/native'

import { useStoreData } from '../../stores'
import { useCurrentLocation } from '../../helpers/geolocation'

import AppHeader from '../../components/layout/AppHeader'
import ListHeaderTitle from '../../components/layout/ListHeaderTitle'
import MenuActionButton from '../../components/MenuActionButton'
import WideContainer from '../../components/layout/WideContainer'
import Map from '../../components/Map'
import Desktop from '../../components/responsive/Desktop'
import Landscape from '../../components/responsive/Landscape'
import PortraitOrMobile from '../../components/responsive/PortraitOrMobile'
import Dialog from '../../components/Dialog'
import Cluster from './Cluster'
import CategoryFilter from '../../components/CategoryFilter'

function useMap() {
  return useStoreData(({ settings, screens: { map } }) => ({
    toggleCategory: map.filter.toggleCategory,
    selectOnlyCategory: map.filter.selectOnlyCategory,
    refresh: map.refresh,
    reload: map.reload,
    showCategoriesDialog: map.showCategoriesDialog,
    hideCategoriesDialog: map.hideCategoriesDialog,

    selectedCategoriesIds: map.filter.selectedCategoriesIds,
    categoriesFilter: map.filter.options,
    locations: map.locations,
    categoriesDialogVisible: map.categoriesDialogVisible,
    mapBoxKey: settings.mapBoxKey,
    loading: map.isLoading || map.isRefreshing
  }))
}

const Columns = styled.View`
  flex-direction: row;
  flex: 1;
`

const RightFilter = styled(ScrollView)`
  flex-direction: column;
  flex: 0.3;
  min-width: 450px;
  max-width: 480px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.headerBorderColor};
`

function MapScreenMenu() {
  const { reload, loading } = useMap()
  return loading ? <ActivityIndicator /> : <MenuActionButton icon="reload" onPress={reload} />
}

function MapScreenHeader(props) {
  const { showCategoriesDialog, reload } = useMap()

  return (
    <AppHeader {...props}>
      <PortraitOrMobile>
        <MenuActionButton icon="filter-variant" onPress={showCategoriesDialog} />
      </PortraitOrMobile>
      <MenuActionButton icon="reload" onPress={reload} />
    </AppHeader>
  )
}

function MapScreen({ navigation } : NavigationInjectedProps) {
  const { t } = useTranslation()
  const location = useCurrentLocation()

  const {
    refresh,
    toggleCategory,
    selectOnlyCategory,
    hideCategoriesDialog,

    categoriesDialogVisible,
    selectedCategoriesIds,
    locations,
    categoriesFilter
  } = useMap()

  useFocusEffect(() => {
    const promise = refresh()
    return () => promise.cancel()
  })

  return (
    <WideContainer navbar>
      <Columns>
        <Map center={location}>
          <Cluster locations={locations} />
        </Map>
        <PortraitOrMobile>
          <Dialog title="dialogs.map.categories.title" visible={categoriesDialogVisible} onDismiss={hideCategoriesDialog}>
            <CategoryFilter
              selectOnlyCategory={selectOnlyCategory}
              toggleCategory={toggleCategory}
              options={categoriesFilter}
              selectedCategoriesIds={selectedCategoriesIds}
            />
          </Dialog>
        </PortraitOrMobile>
        <Desktop>
          <Landscape>
            <RightFilter>
              <ListHeaderTitle>{t('dialogs.map.categories.title')}</ListHeaderTitle>
              <CategoryFilter
                selectOnlyCategory={selectOnlyCategory}
                toggleCategory={toggleCategory}
                options={categoriesFilter}
                selectedCategoriesIds={selectedCategoriesIds}
              />
            </RightFilter>
          </Landscape>
        </Desktop>
      </Columns>
    </WideContainer>
  )
}

// @ts-ignore
MapScreen.navigationOptions = props => ({
  title: 'pages.map.title',
  menu: () => <MapScreenMenu />,
  header: (props) => <MapScreenHeader title="pages.map.title" {...props} />
})


export default MapScreen