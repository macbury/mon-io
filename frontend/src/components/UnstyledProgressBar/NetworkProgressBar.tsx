import React from 'react'
import UnstyledProgressBar from './index'
import { useStoreData } from '../../stores'

export default function NetworkProgressBar(props : any) {
  const { processing } = useStoreData(({ processing }) => ({ processing }))
  return <UnstyledProgressBar loading={processing} {...props} />
}