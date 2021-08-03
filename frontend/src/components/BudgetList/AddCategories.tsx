import React, { useMemo, useState, useCallback } from 'react'
import { LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'
import { CategoryBudget, Category, TransactionCategoryKind } from '../../api/graphql'
import CategoryOption from './CategoryOption'

export interface IAddCategoriesProps {
  categories: CategoryBudget[]
  type: TransactionCategoryKind,
  onCategoryPress(category : Category, type: TransactionCategoryKind)
}

const AddCategoryContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0px;
`

const ITEM_WIDTH = 120

export default function AddCategories({ type, categories, onCategoryPress } : IAddCategoriesProps) {
  const [columns, setColumns] = useState(0)
  const items = useMemo(() => {
    if (columns === 0 || !categories){
      return []
    }

    return categories.map(({ category, spend } : CategoryBudget) => (
      <CategoryOption
        type={type}
        onCategoryPress={onCategoryPress}
        category={category}
        spend={spend}
        width={100.0 / columns}
        key={category.id} />
    ))
  }, [categories, columns, onCategoryPress, type])

  const calculateNumberOfRows = useCallback((e : LayoutChangeEvent) => {
    const cols = Math.ceil((e.nativeEvent.layout.width - 50) / ITEM_WIDTH)
    setColumns(cols)
  }, [setColumns])

  return (
    <AddCategoryContainer onLayout={calculateNumberOfRows}>
      {items}
    </AddCategoryContainer>
  )
}