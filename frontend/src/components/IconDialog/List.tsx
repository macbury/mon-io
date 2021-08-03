import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { IListProps } from './types'
import Cell from './Cell'

const COLUMNS = 6

export default function List({ icons, onIconSelected, selected } : IListProps) {
  const renderItem = useCallback(({ item }) => {
    return <Cell name={item} onIconSelected={onIconSelected} selected={item === selected} />
  }, [icons, onIconSelected, selected])

  return (
    <FlatList
      numColumns={COLUMNS}
      data={icons}
      extraData={selected}
      keyExtractor={(name) => name}
      renderItem={renderItem} />
  )
}