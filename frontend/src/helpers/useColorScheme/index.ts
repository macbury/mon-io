import { useMediaQuery } from 'react-responsive'
import { ThemeMode } from '../../config/types'

export default function useColorScheme() : ThemeMode {
  const isDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)"
  })

  if (isDark) {
    return 'dark'
  } else {
    return 'light'
  }
}