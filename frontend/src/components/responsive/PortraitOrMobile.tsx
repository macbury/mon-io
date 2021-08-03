import { useTheme } from 'styled-components/native'

export default function PortraitOrMobile({ children } : { children : any }) {
  const { orientation, device } = useTheme()
  return orientation === 'portrait' || device === 'mobile' ? children || null : null
}
