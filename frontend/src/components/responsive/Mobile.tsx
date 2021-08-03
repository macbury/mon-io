import { useTheme } from 'styled-components/native'

export default function Mobile({ children } : { children : any }) {
  const { device } = useTheme()
  return device === 'mobile' ? (children || null) : null
}
