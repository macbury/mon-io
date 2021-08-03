import React, { useState, useCallback } from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'
import { Searchbar, Menu, Text } from 'react-native-paper'
import AppHeader from '../../components/layout/AppHeader'
import MenuActionButton from '../../components/MenuActionButton'
import PortraitOrMobile from '../../components/responsive/PortraitOrMobile'
import { useStoreData } from '../../stores'

const SearchBarInput = styled(Searchbar)`
  flex: 1;
  margin: 0 auto;
  max-width: ${(props) => props.theme.device === 'desktop' ? '80%' : '100%'};
`

function useTransactions() {
  return useStoreData(({ screens: { transactions } }) => ({
    query: transactions.query,

    downloadExcel: transactions.downloadExcel,
    clearQuery: transactions.clearQuery,
    setQuery: transactions.setQuery,
    showFiltersDialog: transactions.showFiltersDialog
  }))
}

export function TransactionMenu() {
  const { t } = useTranslation()
  const {
    clearQuery,
    downloadExcel
  } = useTransactions()

  const [visible, setVisible] = useState(false)
  const anchor = <MenuActionButton icon="dots-vertical" onPress={() => setVisible(true)} />
  const hideMenu = useCallback(() => setVisible(false), [setVisible])

  const onResetFilter = useCallback(() => {
    hideMenu()
    clearQuery()
  }, [hideMenu, clearQuery])

  const onDownloadExcel = useCallback(() => {
    hideMenu()
    downloadExcel()
  }, [hideMenu, downloadExcel])

  return (
    <Menu onDismiss={hideMenu} visible={visible} anchor={anchor} style={{ marginTop: StatusBar.currentHeight }}>
      <Menu.Item title={t('pages.transactions.menu.export_excel')} onPress={onDownloadExcel} />
      <Menu.Item title={t('pages.transactions.menu.reset_filter')} onPress={onResetFilter} />
    </Menu>
  )
}

export default function TransactionsScreenHeader(props) {
  const { t } = useTranslation()
  const {
    query,
    setQuery,
    showFiltersDialog
  } = useTransactions()

  return (
    <AppHeader hideTitle={true} {...props}>
      <SearchBarInput
        placeholder={t('pages.transactions.search')}
        onChangeText={setQuery}
        value={query}
        style={{ elevation: 0 }}
      />
      <PortraitOrMobile>
        <MenuActionButton icon="filter-variant" onPress={showFiltersDialog} />
      </PortraitOrMobile>
      <TransactionMenu />
    </AppHeader>
  )
}