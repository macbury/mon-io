import React, { useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { Receipt } from '../../api/graphql'
import Item from './Item'

interface IListProps {
  receipts: Receipt[]
  onSelectReceipt(receipt : Receipt)
}

function keyExtractor(item : Receipt) {
  return item.id
}

export default function List(props : IListProps) {
  const {
    onSelectReceipt,
    receipts
  } = props

  const renderItem = useCallback(({ item, ...props }) => {
    return (
      <Item
        receipt={item}
        onReceiptSelect={onSelectReceipt} />
    )
  }, [receipts, onSelectReceipt])

  return (
    <FlatList
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={receipts}
      {...props} />
  )
}