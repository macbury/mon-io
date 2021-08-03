import React, { useState, useCallback } from 'react'
import SectionList from 'react-virtualized-sectionlist'
import styled from 'styled-components/native'
import { IListProps, useSearchableCurrency } from './shared'
import Item from './Item'
import SectionHeader from './SectionHeader'

const ListContainer = styled.View`
  position: relative;
  flex: 1;
`

function renderSectionHeader({ title, style, key }) {
  return (
    <div key={key} style={style}>
      <SectionHeader title={title} />
    </div>
  )
}

export default function List({ usedCurrencies, currencies, query, selectedCurrency, onCurrencySelect, ...props } : IListProps) {
  const sections = useSearchableCurrency(usedCurrencies, currencies, query)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const renderItem = useCallback(({ item, style, key }) => {
    return (
      <div key={key} style={style}>
        <Item
          currency={item}
          selected={selectedCurrency.isoCode === item.isoCode}
          onCurrencySelect={onCurrencySelect} />
      </div>
    )
  }, [selectedCurrency, onCurrencySelect])

  return (
    <ListContainer {...props} onLayout={({ nativeEvent: { layout: { width, height } } }) => setSize({ width, height })}>
      <SectionList
        {...size}
        sections={sections}
        sectionHeaderRenderer={renderSectionHeader}
        sectionHeaderHeight={60}
        rowHeight={56}
        rowRenderer={renderItem} />
    </ListContainer>
  )
}