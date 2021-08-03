import { useEffect, useState } from 'react'
import { GeoPosition, GeoOptions } from 'react-native-geolocation-service'
import { LocationInput } from '../../api/graphql'

export function useRequestGeolocation() {
  useEffect(() => { requestLocationPermission() })
}

export async function requestLocationPermission() {
  try {
    await promiseGetCurrentPosition({})
    return true
  } catch (error) {
    console.error('useRequestGeolocation', error)
    return false
  }
}

function promiseGetCurrentPosition(options) : Promise<GeoPosition | Position> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

export async function getCurrentLocation(options? : GeoOptions) : Promise<LocationInput> {
  try {
    const data = await promiseGetCurrentPosition(options)
    if (data) {
      const { coords: { latitude, longitude } } = data
      return  { lat: latitude, lng: longitude }
    } else {
      return null
    }
  } catch (error) {
    console.error('getCurrentLocation', error)
    return null
  }
}

export function useCurrentLocation(options? : GeoOptions) : LocationInput {
  const [location, setLocation] = useState<LocationInput>()

  useEffect(() => {
    getCurrentLocation(options).then(setLocation)
  }, [options, setLocation])

  return location
}