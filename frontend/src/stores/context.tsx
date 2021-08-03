import React, { useState } from 'react';
import { RootStore } from './index'

export const StoreContext = React.createContext<RootStore | null>(null);

interface IStoreProviderProps {
  children : React.ReactNode | any
  store : RootStore
}

/**
 * Mobx state provider. Provides RootStore to the whole app dude
 * @param param
 */
export function StoreProvider({ children, store } : IStoreProviderProps) {
  const [localStore] = useState(store)

  return (
    <StoreContext.Provider value={localStore}>
      {children}
    </StoreContext.Provider>
  )
}