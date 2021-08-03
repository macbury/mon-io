import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useTheme } from 'styled-components/native'

interface IMenuActionButtonProps {
  icon: string;
  loading?: boolean;

  onPress();
}

export default function MenuActionButton({loading, ...props} : IMenuActionButtonProps) {
  const { colors } = useTheme()

  if (loading) {
    return <ActivityIndicator color={colors.text} size={24} />
  }

  return <Appbar.Action color={colors.icon} {...props} />
}