import React, { Suspense } from 'react'
import { IPreviewPdfProps } from './types'
import FullPageLoader from '../layout/FullPageLoader'

const LazyPdfPreview = React.lazy(() => import('./LazyPreview'))

export default function PreviewPdf(props : IPreviewPdfProps) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <LazyPdfPreview {...props} />
    </Suspense>
  )
}