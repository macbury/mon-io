import React, { useMemo } from 'react'
import MapboxGL from "@react-native-mapbox-gl/maps"

import { IClusterProps } from './types'
import { LocationMarker } from './Markers'


export default function Cluster({ locations } : IClusterProps) {
  const markers = useMemo(() => (
    locations.map((summary) => (
      <MapboxGL.PointAnnotation key={summary.id} id={summary.id} coordinate={[summary.location.lat, summary.location.lng]}>
        <LocationMarker summary={summary} />
      </MapboxGL.PointAnnotation>
    ))
  ), [locations])

  return markers
}