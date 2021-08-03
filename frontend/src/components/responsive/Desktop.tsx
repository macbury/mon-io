import { useTheme } from 'styled-components/native'

export default function Desktop({ children } : { children : any }) {
  const { device } = useTheme()
  return device === 'desktop' ? children || null : null
}
