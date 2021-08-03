import React from 'react'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import styled, { DefaultTheme } from 'styled-components/native'

interface IButtonContainerProps {
  theme?: DefaultTheme
  disabled?: boolean
}

const ButtonContainer = styled.TouchableOpacity<IButtonContainerProps>`
  min-height: 53px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 9999px;
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => disabled ? '0.1' : '1.0'};
`

const ButtonText = styled(Text)`
  color: #fff;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: row;
  text-align: center;
  display: flex;
  text-transform: uppercase;
  font-weight: bold;
`

export interface IButtonProps {
  title: string
  disabled?: boolean
  theme?: any
  onPress?()
}

export default function Button(props : IButtonProps) {
  const { t } = useTranslation()

  const {
    title,
    disabled,
    onPress,
    ...rest
  } = props

  return (
    <ButtonContainer onPress={onPress} disabled={disabled} {...rest}>
      <ButtonText >{t(title)}</ButtonText>
    </ButtonContainer>
  )
}