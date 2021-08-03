import { Linking, Platform } from 'react-native'
import { useCallback } from 'react'

type Location = {
  lat: number;
  lng: number;
}

export function openMap({ lat, lng }: Location) {
  const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lng}/${lat}`
  if (Platform.OS === 'web') {
    window.open(url, '_blank')
  } else {
    Linking.openURL(url)
  }
}

export function useOpenMap(location: Location) {
  return useCallback(() => (openMap(location)), [location])
}