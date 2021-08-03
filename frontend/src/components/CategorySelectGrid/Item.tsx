import React, { useCallback } from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import styled, { DefaultTheme } from 'styled-components/native'
import CategoryIcon from '../CategoryIcon'
import { IItemProps } from './types'

interface IItemContainerProps {
  height: number;
  selected: boolean;
  theme: DefaultTheme;
}

const ItemContainer = styled(TouchableRipple)`
  height: ${(props : IItemContainerProps) => props.height};
  width: ${(props : IItemContainerProps) => props.height};
  flex-flow: row wrap;
  border-width: 1px;
  opacity: ${(props : IItemContainerProps) => props.selected ? 1.0 : 0.8};
  border-color: ${(props : IItemContainerProps) => props.selected ? props.theme.itemSelectedBorderColor : props.theme.itemBorderColor};
`

const ItemInner = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`

interface INameTextProps {
  theme?: DefaultTheme;
  color?: string;
}

const NameText = styled(Text)`
  color: ${(prop : INameTextProps) => prop.color ? prop.color : prop.theme.colors.text};
`

export default function Item({ category, size, selected, onSelectCategory } : IItemProps) {
  const onItemPress = useCallback(() => {
    onSelectCategory(category)
  }, [category, onSelectCategory])

  return (
    <ItemContainer selected={selected} height={size} onPress={onItemPress} rippleColor={`${category.color}3C`}>
      <ItemInner>
        {category.icon && <CategoryIcon color={category.color} name={category.icon} />}
        <NameText color={category.color}>
          {category.name}
        </NameText>
      </ItemInner>
    </ItemContainer>
  )
}