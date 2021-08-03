import React from 'react'
import { useTheme } from 'styled-components/native'
import { Appbar } from 'react-native-paper'

interface IBackButtonProps {
  onPress()
}

export default function BackButton({ onPress } : IBackButtonProps) {
  const {
    colors: {
      icon
    }
  } : any = useTheme()

  return (
    <Appbar.BackAction
      color={icon}
      onPress={onPress} />
  )
}