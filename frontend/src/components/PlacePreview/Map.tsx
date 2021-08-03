import React, { Suspense } from 'react'
import { IPlacePreviewProps } from './types'
import FullPageLoader from '../layout/FullPageLoader'

const LazyMap = React.lazy(() => import('./LazyMap'))

export default function PreviewPdf(props : IPlacePreviewProps) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <LazyMap {...props} />
    </Suspense>
  )
}