import React, { useMemo } from 'react'
import { Marker, Cluster } from 'react-mapbox-gl'
import { IClusterProps } from './types'
import { ClusterAmount, LocationMarker } from './Markers'

function clusterMarker(coordinates, pointCount: number, getLeaves : any) {
  const items = getLeaves()

  return (
    <Marker key={coordinates} coordinates={coordinates}>
      <ClusterAmount items={items} />
    </Marker>
  )
}

export default function LazyCluster({ locations } : IClusterProps) {
  const markers = useMemo(() => (
    locations.map((summary) => (
      <Marker key={summary.id} coordinates={[summary.location.lat, summary.location.lng]} {...{ summary } as any}>
        <LocationMarker summary={summary} />
      </Marker>
    ))
  ), [locations])

  return (
    <Cluster ClusterMarkerFactory={clusterMarker}>
      {markers}
    </Cluster>
  )
}