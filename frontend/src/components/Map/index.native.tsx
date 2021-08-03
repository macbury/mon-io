import React, { useEffect } from 'react'
import { useTheme } from 'styled-components/native'
import MapboxGL from "@react-native-mapbox-gl/maps"
import { useStoreData } from '../../stores'
import { IMapProps } from './types'

function useMapBoxKey() {
  return useStoreData(({ settings: { mapBoxKey } }) => ({
    mapBoxKey
  }))
}

export default function Map({ center, children, ...props } : IMapProps) {
  const theme = useTheme()
  const { mapBoxKey } = useMapBoxKey()

  useEffect(() => {
    MapboxGL.setAccessToken(mapBoxKey)
    MapboxGL.setTelemetryEnabled(false)
  }, [mapBoxKey])

  return (
    <MapboxGL.MapView
      {...props}
      style={{flex: 1}}
      styleURL={theme.mapBoxStyle}>
      <MapboxGL.Camera
        zoomLevel={12}
        centerCoordinate={center ? [center.lng, center.lat] : undefined}
      />
      {children}
    </MapboxGL.MapView>
  )
}