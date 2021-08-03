import React, { useCallback } from 'react'
import { View } from 'react-native'
import { TouchableRipple, Text } from 'react-native-paper'
import styled, { useTheme } from 'styled-components/native'
import { useMediaQuery } from 'react-responsive'
import Icon from '../../Icon'

interface IContainerProps {
  fill?: boolean | number;
  disabled?: boolean;
  action?: boolean;
  primaryColor?: string;
  rippleColor?: string;
}

function fillToNumber({ fill } : IContainerProps) {
  if (fill) {
    return fill === true ? 2 : fill
  } else {
    return 1
  }
}

const Container = styled(TouchableRipple)`
  display: flex;
  flex: ${fillToNumber};
  background: ${(props : IContainerProps) => props.primaryColor ? props.primaryColor : 'transparent'};
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.itemBorderColor};
  opacity: ${(props) => props.disabled ? 0.7 : 1.0};
`

interface ILabelProps {
  isBigScreen: boolean
}

const Label = styled(Text)`
  font-size: ${(props : ILabelProps) => props.isBigScreen ? '28px' : '18px'};
`

interface IButtonProps extends IContainerProps {
  char?: string;
  icon?: string;
  onPress(char:string)
}

export default function Button({ char, icon, rippleColor, onPress, action, ...rest } : IButtonProps) {
  const onButtonPress = useCallback(() => (onPress(char)), [char, onPress])
  const isBigScreen = useMediaQuery({ minWidth: 480 })
  const theme = useTheme()

  return (
    <Container onPress={onButtonPress} {...rest} rippleColor={rippleColor}>
      <View>
        {icon ? <Icon color={action ? '#fff' : theme.colors.icon} size={isBigScreen ? 32 : 18} name={icon} /> : <Label isBigScreen={isBigScreen}>{char}</Label>}
      </View>
    </Container>
  )
}