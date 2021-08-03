import React from 'react'
import { useTheme } from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface IFileTypeIconProps {
  type: string;
  size?: number
}

export default function FileTypeIcon({ type, size } : IFileTypeIconProps) {
  const theme = useTheme()
  const width = size ? size : 32

  if (type === 'application/pdf') {
    return <Icon name="file-pdf" size={width} color={theme.colors.icon} />
  } else if (type === 'image/jpeg' || type === 'image/png') {
    return <Icon name="file-image" size={width} color={theme.colors.icon} />
  } else {
    return <Icon name="email" size={width} color={theme.colors.icon} />
  }
}