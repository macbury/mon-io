import React, { Suspense } from 'react'
import { IApiPlaygroundProps } from './types'
import FullPageLoader from '../../components/layout/FullPageLoader'

const LazyPlayground = React.lazy(() => (import('./LazyPlayground')))

export default function ApiPlayground(props : IApiPlaygroundProps) {
  return (
    <Suspense fallback={<FullPageLoader />} >
      <LazyPlayground {...props} />
    </Suspense>
  )
}