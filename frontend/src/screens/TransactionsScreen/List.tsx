import React, { useCallback, useMemo } from 'react'
import { ScrollView } from 'react-navigation'
import styled from 'styled-components/native'
import { debounce } from 'underscore'
import { IListProps } from './types'
import { VirtualizedList } from 'react-native'
import { editTransactionPath } from '../../helpers/urls'// TODO path for transactions screen here
import logger from '../../helpers/logger'

import TransactionItemPlaceholder from '../../components/TransactionList/ItemPlaceholder'
import TransactionItem from '../../components/TransactionList/Item'

const log = logger('TransactionList')

const CustomScrollView = styled(ScrollView)`
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

export default function TransactionList({ getItem, totalCount, paginationKey, fetchPagesByIndexes } : IListProps) {
  const onGetItemCount = useCallback(() => totalCount, [totalCount])
  const onGetItem = useCallback((_data, index : number) => {
    return getItem(index) || {}
  }, [getItem])

  const onViewableItemsChanged = useMemo(() => {
    const func = ({ viewableItems }) => {
      const startIndex = viewableItems[0]?.index
      const endIndex = viewableItems[viewableItems.length-1]?.index

      fetchPagesByIndexes(startIndex, endIndex)
    }
    return debounce(func, 250)
  }, [fetchPagesByIndexes])

  const onRenderItem = useCallback(({ index, item }) => {
    if (item?.id) {
      return <TransactionItem action={editTransactionPath(item.id)} transaction={item} />
    } else {
      return <TransactionItemPlaceholder key={index} />
    }
  }, [fetchPagesByIndexes])

  const onKeyExtractor = useCallback((transaction, index) => transaction?.id || index.toString(), [])

  return (
    <VirtualizedList
      renderScrollComponent={(props) => <CustomScrollView {...props} />}
      onViewableItemsChanged={onViewableItemsChanged}
      getItem={onGetItem}
      data={paginationKey}
      getItemCount={onGetItemCount}
      renderItem={onRenderItem}
      extraData={paginationKey}
      keyExtractor={onKeyExtractor}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
    />
  )
}