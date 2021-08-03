import { useEffect } from 'react'
import { useIsFocused } from 'react-navigation-hooks'
import { changeBarColors } from 'react-native-immersive-bars'
import logger from '../logger'

const log = logger('Theme')

export function useSetAndroidColors(navColor : string, statusColor : string, dark : boolean) {
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      log('Changed color of status bar to ', statusColor)
      log('Changed color of nav bar to ', navColor)
      log('Changed status bar icons are dark ', dark)
      changeBarColors(dark, statusColor, navColor)
    }
  }, [isFocused, navColor, statusColor, dark])
}