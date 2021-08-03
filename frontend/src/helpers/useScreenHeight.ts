import { useLayoutEffect, useState, useRef } from 'react'
import { useFocusEffect } from 'react-navigation-hooks'
import { Dimensions, StatusBar } from 'react-native'
import { ScrollView } from 'react-navigation'

function calculateContainerHeight() {
  let height = Dimensions.get('screen').height - (StatusBar.currentHeight || 0) - 60
  height = Math.max(640, height)
  return height
}

export function useScreenHeight() {
  const [height, setHeight] = useState(calculateContainerHeight())

  useLayoutEffect(() => {
    setHeight(calculateContainerHeight())

    function onChange() {
      setHeight(calculateContainerHeight())
    }

    Dimensions.addEventListener('change', onChange)

    return () => Dimensions.removeEventListener('change', onChange)
  }, [setHeight])

  return height
}

export function useScrollDown() {
  const containerScroll = useRef<ScrollView>()

  useFocusEffect(() => {
    if (containerScroll.current) {
      containerScroll.current.scrollToEnd({ animated: true })
    }
  })

  return containerScroll
}