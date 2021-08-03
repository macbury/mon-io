import React, { Suspense } from 'react'
import { IClusterProps } from './types'

const LazyCluster = React.lazy(() => (import('./LazyCluster')))

export default function Cluster(props : IClusterProps) {
  return (
    <Suspense fallback={null}>
      <LazyCluster {...props} />
    </Suspense>
  )
}