import React from 'react'
import styled from 'styled-components/native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const DETAILS_ICON_SIZE = 20

const FaviconImage = styled.Image`
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  width: ${DETAILS_ICON_SIZE}px;
  height: ${DETAILS_ICON_SIZE}px;
  margin-right: 5px;
`

export const DetailsIcon = styled(MaterialIcons)`
  margin-right: 5px;
`

export interface IDetailsIconsProps {
  url: string
}

export function FaviconIcon({ url } : IDetailsIconsProps) {
  if (!url || url.length === 0) {
    return null
  }

  return <FaviconImage source={{ uri: url }}  />
}