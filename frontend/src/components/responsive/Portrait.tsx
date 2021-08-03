import { useTheme } from 'styled-components/native'

export default function Portrait({ children } : { children : any }) {
  const { orientation } = useTheme()
  return orientation === 'portrait' ? children || null : null
}
