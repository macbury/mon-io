import React, { useCallback, useState, useMemo } from 'react'
import { FlatList,LayoutChangeEvent } from 'react-native'
import Item from './Item'
import { ICategorySelectGridProps } from './types'

const extractKey = ({ id }) => id

export default function CategorySelectGrid(props : ICategorySelectGridProps) {
  const { categories, selectedCategory, numOfColumns, ...rest } = props
  const [itemWidth, setItemWidth] = useState(0)
  const selectedCategoryId = selectedCategory ? selectedCategory.id : null

  const renderItem = useCallback(({ item }) => {
    return <Item category={item} size={itemWidth} selected={item.id === selectedCategoryId} {...rest} />
  }, [itemWidth, selectedCategoryId])

  const detectItemWidth = useCallback((e : LayoutChangeEvent) => {
    setItemWidth(e.nativeEvent.layout.width / numOfColumns)
  }, [setItemWidth])

  return <FlatList
    key={numOfColumns}
    onLayout={detectItemWidth}
    numColumns={numOfColumns}
    data={categories}
    keyExtractor={extractKey}
    extraData={[selectedCategory]}
    renderItem={renderItem} />
}