import React, { useCallback } from 'react'
import { SectionList } from 'react-native'
import { Currency } from '../../api/graphql'
import { IListProps, useSearchableCurrency } from './shared'
import Item from './Item'
import SectionHeader from './SectionHeader'

function keyExtractor(item : Currency) {
  return item.id
}

function renderSectionHeader({ section }) {
  return <SectionHeader title={section.title} />
}

export default function List({ usedCurrencies, currencies, query, selectedCurrency, onCurrencySelect } : IListProps) {
  const sections = useSearchableCurrency(usedCurrencies, currencies, query)
  const renderItem = useCallback(({ item}) => {
    return (
      <Item
        currency={item}
        selected={selectedCurrency.isoCode === item.isoCode}
        onCurrencySelect={onCurrencySelect} />
    )
  }, [selectedCurrency, onCurrencySelect])

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  )
}