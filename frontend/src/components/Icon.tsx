import React from 'react'
import { useTheme } from 'styled-components/native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

interface IIconProp {
  name: string;
  size: number;
  color?: string;
}

export default function Icon({ name, color, ...rest } : IIconProp) {
  const [type, key] = name.split(':')
  const { colors } = useTheme()
  const selectedColor = color || colors.icon

  switch(type) {
    case 'MaterialIcons':
      return <MaterialIcon name={key} color={selectedColor} {...rest} />

    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={key} color={selectedColor} {...rest} />

    case 'FontAwesome':
      return <FontAwesomeIcon name={key} color={selectedColor} {...rest} />

    default:
      throw `Could not find type for icon: ${type} and key ${key}`
  }
}