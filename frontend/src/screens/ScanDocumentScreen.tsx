import React, { useLayoutEffect } from 'react'
import { NavigationInjectedProps } from 'react-navigation'

export default function ScanDocumentScreen(props : NavigationInjectedProps) {
  useLayoutEffect(() => {
    props.navigation.goBack()
  })
  return null
}
