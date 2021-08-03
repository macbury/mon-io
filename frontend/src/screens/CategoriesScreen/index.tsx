import React, { useEffect, useMemo, useState } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { useIsFocused } from 'react-navigation-hooks'
import { SectionList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { FAB, Portal } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import { useDefaultScreenBar } from '../../helpers/useSetNavBarColor'

import HeaderTitle from '../../components/layout/ListHeaderTitle'
import WideContainer from '../../components/layout/WideContainer'
import CenteredScroll from '../../components/CenteredScroll'
import FullPageLoader from '../../components/layout/FullPageLoader'
import CategoryListItem from '../../components/CategoryListItem'
import { Category, TransactionCategoryKind } from '../../api/graphql'
import { useStoreData } from '../../stores'
import { editCategoriesPath, newCategoryPath } from '../../helpers/urls'


function useCategories() {
  return useStoreData(({ categories }) => ({
    categoriesByType: categories.byType,
    loading: categories.isLoading,

    refresh: categories.refresh
  }))
}

function renderSectionHeader({ section }) {
  return <HeaderTitle>{section.title}</HeaderTitle>
}

function renderItem({ item } : { item: Category }) {
  return (
    <CategoryListItem
      action={editCategoriesPath(item.id)}
      category={item}
      key={item.id} />
  )
}

function CategoriesScreen({ navigation } : NavigationInjectedProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  const {
    categoriesByType,
    loading,
    refresh
  } = useCategories()

  const isFocused = useIsFocused()
  const [fabOpened, setFabOpened] = useState(false)

  useEffect(() => void refresh(), [refresh])
  useDefaultScreenBar()

  const sections : any = useMemo(() => {
    return Object.keys(categoriesByType).filter((type) => categoriesByType[type].length > 0).map((type) => {
      return {
        title: t(`pages.categories.sections.${type}`),
        data: categoriesByType[type]
      }
    })
  }, [categoriesByType, t])

  if (loading) {
    return <FullPageLoader />
  }

  const fabPadding = theme.device === "desktop" ? 20 : 10

  return (
    <WideContainer navbar>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderScrollComponent={(props : any) => <CenteredScroll fab {...props} />}
      />

      <FAB.Group
        fabStyle={{ bottom: (theme.insets.bottom + fabPadding), right: fabPadding, marginTop: 20 }}
        visible={true}
        open={fabOpened}
        icon={fabOpened ? 'close' : 'plus'}
        onStateChange={({ open }) => setFabOpened(open)}
        actions={[
          {
            icon: 'piggy-bank',
            label: t(`pages.categories.actions.add.saving`),
            onPress: () => navigation.dispatch(newCategoryPath(TransactionCategoryKind.Saving)),
          },
          {
            icon: 'bank',
            label: t(`pages.categories.actions.add.loan`),
            onPress: () => navigation.dispatch(newCategoryPath(TransactionCategoryKind.Loan)),
          }
        ]} />
    </WideContainer>
  )
}

// @ts-ignore
CategoriesScreen.navigationOptions = props => ({
  title: 'pages.categories.title'
})


export default CategoriesScreen