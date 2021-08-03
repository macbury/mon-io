import React, { useEffect } from 'react'
import { useTheme } from 'styled-components/native'
import MapboxGL from "@react-native-mapbox-gl/maps"
import Mark from './Mark'
import useMapBoxKey from './useMapBoxKey'

import { IPlacePreviewProps } from './types'

function useMapBox() {
  const { mapBoxKey } = useMapBoxKey()

  useEffect(() => {
    MapboxGL.setAccessToken(mapBoxKey)
    MapboxGL.setTelemetryEnabled(false)
  }, [mapBoxKey])
}

export default function Map({ location, category } : IPlacePreviewProps) {
  const theme = useTheme()
  const { lat, lng } = location
  const color = category ? category.color : '#fff'
  const coordinate = [lat, lng]
  useMapBox()

  return (
    <MapboxGL.MapView
      style={{flex: 1}}
      scrollEnabled={false}
      pitchEnabled={false}
      styleURL={theme.mapBoxStyle}>
      <MapboxGL.Camera
        zoomLevel={16}
        centerCoordinate={coordinate}
      />
      <MapboxGL.PointAnnotation id={location.id} coordinate={coordinate}>
        <Mark color={color} />
      </MapboxGL.PointAnnotation>
    </MapboxGL.MapView>
  )
}