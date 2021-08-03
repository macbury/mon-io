import { Appearance } from 'react-native'
import { useState, useEffect } from 'react'
import { ThemeMode } from '../../config/types'

export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ThemeMode>(Appearance.getColorScheme())

  useEffect(() => {
    const listener = ({ colorScheme }) => {
      setColorScheme(colorScheme)
    }

    Appearance.addChangeListener(listener)
    return () => Appearance.removeChangeListener(listener)
  }, [setColorScheme])

  return colorScheme
}
