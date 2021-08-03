import React, { useMemo, useLayoutEffect, useRef, useState } from 'react'
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl'
import styled from 'styled-components/native'
import { useTheme } from 'styled-components/native'
import { useStoreData } from '../../stores'
import { IMapProps } from './types'

const MapContainer = styled.View`
  flex: 1;
`

function useMapBoxKey() {
  return useStoreData(({ settings: { mapBoxKey } }) => ({
    mapBoxKey
  }))
}

export default function LazyMap(props : IMapProps) {
  const [size, setSize] = useState({ width: 10, height: 10 })
  const {
    center,
    children,
    ...restOfProps
  } = props
  const theme = useTheme()
  const {
    mapBoxKey,
  } = useMapBoxKey()

  const Map = useMemo(() => (ReactMapboxGl({
    accessToken: mapBoxKey,
    trackResize: false,
    logoPosition: 'top-left'
  })), [mapBoxKey])


  return (
    <MapContainer onLayout={(e) => setSize(e.nativeEvent.layout)}>
      <Map
        key={size.width + size.height}
        center={center ? [center.lng, center.lat] : undefined}
        containerStyle={{ flex: 1, display: 'flex' }}
        {...restOfProps}
        style={theme.mapBoxStyle}>
        <ZoomControl />
        {children}
      </Map>
    </MapContainer>
  )
}