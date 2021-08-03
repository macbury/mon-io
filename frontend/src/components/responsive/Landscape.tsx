import { useTheme } from 'styled-components/native'

export default function Landscape({ children } : { children : any }) {
  const { orientation } = useTheme()
  return orientation === 'landscape' ? children || null : null
}
