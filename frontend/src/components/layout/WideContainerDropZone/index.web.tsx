import React, { useLayoutEffect, useCallback } from 'react'
import { useIsFocused } from 'react-navigation-hooks'
import WideContainer from '../WideContainer'
import logger from '../../../helpers/logger'
import { IDropZoneProps } from './types'

const log = logger('WideContainerDropZone')

export default function WideContainerDropZone({ onDrop, children } : IDropZoneProps) {
  const isFocused = useIsFocused()
  const handleDrop = useCallback((e :  DragEvent) => {
    e.stopPropagation()
    e.preventDefault()

    const files = e.dataTransfer.files

    const items = []
    for (let index = 0; index < files.length; index++) {
      const element = files.item(index);
      items.push(element)
    }

    if (items.length > 0) {
      log('Received files', items)
      onDrop(items)
    }
  }, [onDrop])

  const handleDragOver = useCallback((ev : DragEvent) => {
    ev.preventDefault()
  }, [])

  useLayoutEffect(() => {
    if (isFocused) {
      //log("Registered new drop zone")
      document.body.addEventListener('dragover', handleDragOver, false)
      document.body.addEventListener('drop', handleDrop, false)
    }

    return () => {
      //log("Unregistered drop zone")
      document.body.removeEventListener('dragover', handleDragOver)
      document.body.removeEventListener('drop', handleDrop)
    }
  }, [handleDrop, handleDragOver, isFocused])

  return (
    <WideContainer>
      {children}
    </WideContainer>
  )
}