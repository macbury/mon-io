import { useMediaQuery } from 'react-responsive'

export default function useMonths() {
  const isDesktop = useMediaQuery({ minWidth: 1300 })
  const isTablet = useMediaQuery({ minWidth: 600 })

  if (isDesktop) {
    return 12
  } else if (isTablet) {
    return 8
  } else {
    return 5
  }
}