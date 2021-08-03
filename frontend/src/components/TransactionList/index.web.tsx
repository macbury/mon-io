import React, { useMemo, useState, useLayoutEffect, useRef } from 'react'
import SectionList from 'react-virtualized-sectionlist'
import styled from 'styled-components/native'
import { EmptyList, ITransactionList } from './shared'

import { editSummaryTransactionPath } from '../../helpers/urls'
import TransactionPeriod from '../../stores/Screens/SummaryStore/TransactionPeriod'
import TransactionItem from './Item'
import SectionHeader from './SectionHeader'

const ListContainer = styled.View`
  position: relative;
  overflow: hidden;
`

export function renderItem({ item, style, key, isVisible }) {
  return (
    <div key={key} style={style}>
      <TransactionItem
        action={editSummaryTransactionPath(item.id)}
        transaction={item}
        simple={!isVisible} />
    </div>
  )
}

export function renderSectionHeader({ title, style, key }) {
  const group = title as TransactionPeriod
  return (
    <div key={key} style={style}>
      <SectionHeader group={group} />
    </div>
  )
}

export default function TransactionList({ header, transactions, ...props } : ITransactionList) {
  const sections = useMemo(() => (
    transactions.map((group) => ({ data: group.transactions, title: group }))
  ), [transactions])
  const [size, setSize] = useState({ width: 0, height: 0 })

  if (!transactions || transactions.length === 0) {
    return (
      <EmptyList />
    )
  }

  return (
    <ListContainer {...props} onLayout={({ nativeEvent: { layout: { width, height } } }) => setSize({ width, height })}>
      <SectionList
        {...size}
        sections={sections}
        sectionHeaderRenderer={renderSectionHeader}
        sectionHeaderHeight={61}
        rowHeight={69}
        rowRenderer={renderItem} />
    </ListContainer>
  )
}