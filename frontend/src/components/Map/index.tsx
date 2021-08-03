import React, { Suspense } from 'react'
import FullPageLoader from '../layout/FullPageLoader'
import { IMapProps } from './types'

const LazyMap = React.lazy(() => (import('./LazyMap')))

export default function Map(props : IMapProps) {
  return (
    <Suspense fallback={<FullPageLoader />} >
      <LazyMap {...props} />
    </Suspense>
  )
}