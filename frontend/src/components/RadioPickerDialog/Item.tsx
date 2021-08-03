import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { RadioButton, Text, TouchableRipple } from 'react-native-paper'
import { RadioOption } from '../../stores/UI/RadioPickerDialogStore'

const Inner = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`

const Name = styled(Text)`
  flex: 1;
  padding-right: 15px;
`

const Symbol = styled(Text)`
  opacity: 0.4;
  font-weight: bold;
`

interface IItemProps{
  option: RadioOption
  selected?: boolean
  onSelect(option: RadioOption)
}

export default function Item({ option, selected, onSelect } : IItemProps) {
  const onOptionPress = useCallback(() => onSelect(option), [option, onSelect])

  return (
    <TouchableRipple onPress={onOptionPress}>
      <Inner>
        <RadioButton
          value="first"
          status={selected ? 'checked' : 'unchecked'}
          onPress={onOptionPress}
        />
        <Name numberOfLines={1}>{option.title}</Name>
      </Inner>
    </TouchableRipple>
  )
}