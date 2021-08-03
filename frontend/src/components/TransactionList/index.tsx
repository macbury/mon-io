import React, { useMemo, useLayoutEffect, useRef } from 'react'
import { SectionList } from 'react-navigation'

import TransactionPeriod from '../../stores/Screens/SummaryStore/TransactionPeriod'
import { EmptyList, ITransactionList, } from './shared'
import { editSummaryTransactionPath } from '../../helpers/urls'
import TransactionItem from './Item'
import SectionHeader from './SectionHeader'

export function renderItem({ item }) {
  return (
    <TransactionItem
      key={item.id}
      action={editSummaryTransactionPath(item.id)}
      transaction={item} />
  )
}

export function renderSectionHeader({ section }) {
  const group = section.group as TransactionPeriod
  return <SectionHeader group={group} key={group.sortKey} />
}

export default function TransactionList({ header, transactions, ...props } : ITransactionList) {
  const listRef = useRef<any>()
  const sections = useMemo(() => (
    transactions.map((group) => ({ data: group.transactions, group }))
  ), [transactions])

  useLayoutEffect(() => {
    if (listRef?.current) {
      listRef.current.recomputeRowHeights()
      listRef.current.forceUpdate()
    }
  }, [listRef])


  if (!transactions || transactions.length === 0) {
    return (
      <EmptyList />
    )
  }

  return (
    <SectionList
      {...props}
      ref={listRef}
      sections={sections}
      renderItem={renderItem}
      initialNumToRender={20}
      renderSectionHeader={renderSectionHeader}
    />
  )
}