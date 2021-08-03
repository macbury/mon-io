import React from 'react'
import styled from 'styled-components/native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-paper/lib/typescript/src/components/Icon'

interface IIconButtonProps {
  icon: string;
  onPress: () => void
  size: number;
  width: number;
}

interface IButtonProps {
  width: number;
}

const Button = styled(TouchableRipple)<IButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: ${(props) => props.width};
`

export default function IconButton({ icon, onPress, size, width } : IIconButtonProps) {
  return (
    <Button onPress={onPress} width={width}>
      <Icon color="#fff" source={icon} size={size} />
    </Button>
  )
}
