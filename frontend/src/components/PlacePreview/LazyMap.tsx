import React, { useMemo } from 'react'
import { useTheme } from 'styled-components/native'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import { IPlacePreviewProps } from './types'
import Mark from './Mark'
import useMapBoxKey from './useMapBoxKey'

export default function LazyMap({ location, category } : IPlacePreviewProps) {
  const theme = useTheme()
  const { mapBoxKey } = useMapBoxKey()
  const Map = useMemo(() => (ReactMapboxGl({
    accessToken: mapBoxKey,
    interactive: false
  })), [mapBoxKey])

  const { lat, lng } = location
  const color = category ? category.color : theme.colors.text

  return (
    <Map
      containerStyle={{flex: 1}}
      center={[lat, lng]}
      zoom={[16]}
      style={theme.mapBoxStyle}>
      <Marker coordinates={[lat, lng]}>
        <Mark color={color} />
      </Marker>
    </Map>
  )
}