import React, { useEffect, useMemo } from 'react'
import { debounce } from 'underscore'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'react-navigation-hooks'
import { ScrollView } from 'react-navigation'
import styled from 'styled-components/native'

import WideContainer from '../../components/layout/WideContainer'
import FullPageLoader from '../../components/layout/FullPageLoader'
import Desktop from '../../components/responsive/Desktop'
import Landscape from '../../components/responsive/Landscape'
import Portrait from '../../components/responsive/Portrait'
import Mobile from '../../components/responsive/Mobile'
import Dialog from '../../components/Dialog'
import ErrorMessageContent from '../../components/ErrorMessageContent'
import Header from './Header'
import TransactionList from './List'
import Filter from './Filter'
import useTransactions from './useTransactions'

const ColumnWideContainer = styled(WideContainer)`
  flex-direction: row;
`

const RightFilter = styled.View`
  flex-direction: column;
  flex: 0.3;
  min-width: 450px;
  max-width: 480px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.headerBorderColor};
`

const ListContainer = styled.View`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

function SearchResult({ totalCount, loading, getItem, onFetchRows, paginationKey }) {
  const { t } = useTranslation()

  if (loading) {
    return <FullPageLoader />
  }

  if (totalCount === 0) {
    return <ErrorMessageContent message={t('pages.transactions.empty')} />
  }

  return (
    <TransactionList
      getItem={getItem}
      fetchPagesByIndexes={onFetchRows}
      paginationKey={paginationKey}
      totalCount={totalCount} />
  )
}

function TransactionsScreen() {
  const {
    search,
    getItem,
    fetchPagesByIndexes,
    hideFilterDialog,

    paginationKey,
    totalCount,
    filtersDialogVisible,
    loading
  } = useTransactions()

  const navigation = useNavigation()
  const date = navigation.getParam('date')
  const importId = navigation.getParam('importId')

  const onFetchRows = useMemo(() => (
    debounce(fetchPagesByIndexes, 250)
  ), [fetchPagesByIndexes])

  useEffect(() => {
    search(importId)
  }, [date, importId, search])

  return (
    <ColumnWideContainer navbar>
      <Mobile>
        <Dialog visible={filtersDialogVisible} onDismiss={hideFilterDialog}>
          <Filter />
        </Dialog>
      </Mobile>
      <ListContainer>
        <SearchResult
          paginationKey={paginationKey}
          onFetchRows={onFetchRows}
          getItem={getItem}
          totalCount={totalCount}
          loading={loading}  />
      </ListContainer>
      <Desktop>
        <Landscape>
          <RightFilter>
            <ScrollView>
              <Filter />
            </ScrollView>
          </RightFilter>
        </Landscape>
        <Portrait>
          <Dialog visible={filtersDialogVisible} onDismiss={hideFilterDialog}>
            <Filter />
          </Dialog>
        </Portrait>
      </Desktop>
    </ColumnWideContainer>
  )
}

// @ts-ignore
TransactionsScreen.navigationOptions = props => ({
  title: 'pages.transactions.title',
  header: (props) => <Header {...props} />
})

export default TransactionsScreen