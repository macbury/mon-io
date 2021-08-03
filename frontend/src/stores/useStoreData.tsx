import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { StoreContext } from './context'
import RootStore from './RootStore'

export function useStoreData<Selection>(dataSelector: (store: RootStore) => Selection) {
  const store = React.useContext(StoreContext)

  if (!store) {
    throw new Error('Could not find store!')
  }

  return useObserver(() => {
    return dataSelector(store)
  })
}
