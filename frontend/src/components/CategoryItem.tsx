import React, { useMemo } from 'react'
import { List, Checkbox } from 'react-native-paper'
import styled from 'styled-components/native'

export interface ICategoryItemProps {
  name: string
  selected: boolean
  color: string
  onPress()
  onLongPress()
}

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

export default function CategoryItem({ name, selected, color, onPress, onLongPress } : ICategoryItemProps) {
  return (
    <List.Item
      onPress={onPress}
      onLongPress={onLongPress}
      title={name}
      left={props => <LegendCategoryItem color={color} />}
      right={props => <Checkbox color={color} onPress={onPress} status={selected ? 'checked' : 'unchecked'}/>}
    />
  )
}