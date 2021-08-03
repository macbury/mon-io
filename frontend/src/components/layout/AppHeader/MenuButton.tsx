import React from 'react'
import { useTheme } from 'styled-components/native'
import { Appbar } from 'react-native-paper'

interface IMenuButtonProps {
  onPress()
}

export default function MenuButton({ onPress } : IMenuButtonProps) {
  const {
    colors: {
      icon
    }
  } : any = useTheme()

  return (
    <Appbar.Action
      icon="menu"
      color={icon}
      onPress={onPress} />
  )
}