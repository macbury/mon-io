import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import styled from 'styled-components/native'

import Map from './Map'
import { Location, Category } from '../../api/graphql'
import { useOpenMap } from '../../helpers/openMap'

const FillGap = styled.View`
  flex: 1;
`

const Container = styled.View`
  flex: 1;
`
export interface IPlacePreview {
  location?: Location;
  category?: Category;
}

const OpenMapLink = styled(TouchableRipple)`
  border-bottom-width: 0;
  flex: 1;
  display: flex;
  margin: 10px 0px;
  border-radius: 10px;
  overflow: hidden;
`

const AddressText = styled(Text)`
  padding: 10px;
  text-align: center;
  background: ${({ theme }) => theme.colors.overlay};
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
`

export default function PlacePreview(props : IPlacePreview) {
  const { location } = props
  const onPreviewPress = useOpenMap(location)

  if (!location) {
    return <FillGap />
  }

  const name = [location.name, location.city].join(', ')

  return (
    <OpenMapLink onPress={onPreviewPress}>
      <Container>
        <Map {...props} />
        <AddressText>{name}</AddressText>
      </Container>
    </OpenMapLink>
  )
}