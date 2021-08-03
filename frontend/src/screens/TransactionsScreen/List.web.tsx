import React, { useCallback, useRef, useEffect } from 'react'
import { List, AutoSizer } from 'react-virtualized'
import { editTransactionPath } from '../../helpers/urls'// TODO path for transactions screen here
import TransactionItem from '../../components/TransactionList/Item'
import TransactionItemPlaceholder from '../../components/TransactionList/ItemPlaceholder'
import { IListProps } from './types'

export default function TransactionList({ getItem, totalCount, paginationKey, fetchPagesByIndexes } : IListProps) {
  const listRef = useRef<any>()

  const renderItem = useCallback(({ index, style, key, isVisible }) => {
    const transaction = getItem(index)

    if (transaction) {
      return (
        <div key={key} style={style}>
          <TransactionItem
            action={editTransactionPath(transaction.id)}
            transaction={transaction}
            simple={!isVisible} />
        </div>
      )
    } else {
      return (
        <TransactionItemPlaceholder
          style={style}
          key={index} />
      )
    }
  }, [getItem])

  const onRowsRendered = useCallback(({ startIndex, overscanStopIndex }) => {
    fetchPagesByIndexes(startIndex, overscanStopIndex)
  }, [fetchPagesByIndexes])

  useEffect(() => {
    if (listRef?.current) {
      listRef.current.recomputeRowHeights()
      listRef.current.forceUpdate()
    }
  }, [listRef, paginationKey])

  return (
    <AutoSizer>
      {({width, height} : { width: number, height: number }) => (
        <List
          ref={listRef}
          onRowsRendered={onRowsRendered}
          height={height}
          rowCount={totalCount}
          rowHeight={69}
          rowRenderer={renderItem}
          width={width}
        />
      )}
    </AutoSizer>
  )
}