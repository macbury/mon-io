import React from 'react'
import styled from 'styled-components/native'
import { List, Checkbox } from 'react-native-paper'
import { Category } from '../../api/graphql'

const Container = styled.View`
  flex-direction: ${({ theme }) => theme.orientation === 'landscape' ? 'column' : 'row' };
  flex-wrap: ${({ theme }) => theme.orientation === 'landscape' ? 'no-wrap' : 'wrap' };
  max-width: ${({ theme }) => theme.orientation === 'landscape' ? 'auto' : '600px' };
  margin: ${({ theme }) => theme.orientation === 'landscape' ? '0px' : '0px auto' };
`

const Item = styled(List.Item)`
  width: ${({ theme }) => theme.orientation === 'landscape' ? '100%' : '50%' };
`

interface ILegendChartItemProps {
  color: string
}

const LegendCategoryItem = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  margin: 10px 5px;
  background-color: ${(props : ILegendChartItemProps) => props.color};
`

interface ICategoryLegendsProps {
  categories: Category[]
  selectedCategoriesIds: { [id:string]: boolean }
  toggle(categoryId : string)
  selectOnly(categoryId: string)
}

export default function CategoryLegends(props : ICategoryLegendsProps)  {
  const {
    categories,
    selectedCategoriesIds,
    toggle,
    selectOnly
  } = props

  const items = categories.map(({ id, color, name }) => {
    const selected = selectedCategoriesIds[id]
    const key = selected ? `s${id}` : id

    return (
      <Item
        key={key}
        onPress={() => void toggle(id)}
        onLongPress={() => void selectOnly(id)}
        title={name}
        left={props => <LegendCategoryItem color={color} />}
        right={props => <Checkbox color={color} onPress={() => void toggle(id)} status={selected ? 'checked' : 'unchecked'}/>}
      />
    )
  })

  return (
    <Container>
      {items}
    </Container>
  )
}