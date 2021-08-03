import { useTheme } from 'styled-components/native'
import { useSetAndroidColors } from './useSetAndroidColors'

export { useSetAndroidColors }

export function useFullScreenBar() {
  const { colors, dark } = useTheme()

  useSetAndroidColors(
    colors.background,
    colors.background,
    dark
  )
}

export function useDefaultScreenBar() {
  const { dark, headerBackground, navbarColor } = useTheme()

  useSetAndroidColors(
    navbarColor,
    headerBackground,
    dark
  )
}

export function useModalScreenBar() {
  const { dark, headerBackground, navbarColor } = useTheme()

  useSetAndroidColors(
    navbarColor,
    headerBackground,
    dark
  )
}