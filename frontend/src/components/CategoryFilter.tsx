import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Category } from '../api/graphql'
import CategoryItem from './CategoryItem'

const CategoryFilterContainer = styled.View`
  flex: 1;
`

type CategoryFilterOption = {
  category: Category;
  selected: boolean;
}

export interface ICategoryFilterProps {
  options: CategoryFilterOption[]
  selectedCategoriesIds: string[]

  toggleCategory(categoryId: string)
  selectOnlyCategory(categoryId)
}

export default function CategoryFilter({ selectedCategoriesIds, options, toggleCategory, selectOnlyCategory } : ICategoryFilterProps) {
  const categoriesItems = useMemo(() => (options?.map(({ category, selected }) => (
    <CategoryItem
      key={`${category.id}-${selected}`}
      onPress={() => void toggleCategory(category.id)}
      onLongPress={() => void selectOnlyCategory(category.id)}
      name={category.name}
      color={category.color}
      selected={selected}
    />
  ))), [options, toggleCategory, selectOnlyCategory, selectedCategoriesIds])

  return (
    <CategoryFilterContainer>
      {categoriesItems}
    </CategoryFilterContainer>
  )
}