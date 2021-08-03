import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react'
import { useTheme } from 'styled-components/native'
import { View, Keyboard, Dimensions, KeyboardEvent, useWindowDimensions } from 'react-native'

export default function KeyboardShift({ children }) {
  const theme = useTheme()
  const windowDimension = useWindowDimensions()
  const [shift, setShift] = useState(0)

  useEffect(() => {
    setShift(windowDimension.height - theme.insets.bottom)
  }, [windowDimension.height, theme.insets.bottom])

  const handleKeyboardDidShow = useCallback((event : KeyboardEvent) => {
    const { height: windowHeight } = Dimensions.get('window')
    const keyboardHeight = event.endCoordinates.height
    const gap = (windowHeight - keyboardHeight)

    setShift(gap)
  }, [setShift])


  const handleKeyboardDidHide = useCallback((event : KeyboardEvent) => {
    setShift(Dimensions.get('window').height)
  }, [setShift])

  useLayoutEffect(() => {
    const keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
    const keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)

    return () => {
      keyboardDidShowSub.remove()
      keyboardDidHideSub.remove()
    }
  }, [handleKeyboardDidShow])

  return (
    <View style={{ height: shift  }}>
      {children}
    </View>
  )
}