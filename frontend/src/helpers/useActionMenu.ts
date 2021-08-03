import React, { useCallback } from 'react'
import { useStoreData } from '../stores'

function useMenuActionStore() {
  return useStoreData(({ ui: { menuAction } }) => ({
    show: menuAction.show
  }))
}


export default function useActionMenu() {
  const { show } = useMenuActionStore()
  return useCallback((options, callback) => {
    show(options, callback)
  }, [show])
}