import React from 'react'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import { TouchableRipple } from 'react-native-paper'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export const ICON_SIZE = 28

const AdditionalPadding = styled.View`
  padding: 5px;
  align-items: center;
  justify-content: center;
  height: 57px;
  flex: 1;
`

interface IIconInnerProps {
  selected?: boolean
  theme: DefaultTheme
}

const IconInner = styled.View<IIconInnerProps>`
  align-items: center;
  justify-content: center;
  padding: 5px;
  background: ${({ theme, selected }) => selected ? theme.colors.text : theme.colors.background};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 90px;
  width: 47px;
  height: 47px;
`

export interface ICellProps {
  name: string
  selected?: boolean
  onIconSelected(name: string)
}

export default function Cell({ name, selected, onIconSelected } : ICellProps) {
  const theme = useTheme()

  return (
    <AdditionalPadding>
      <TouchableRipple onPress={() => onIconSelected(name)} centered>
        <IconInner selected={selected}>
          <MaterialCommunityIcon
            name={name}
            color={selected ? theme.colors.background : theme.colors.text}
            size={ICON_SIZE} />
        </IconInner>
      </TouchableRipple>
    </AdditionalPadding>
  )
}