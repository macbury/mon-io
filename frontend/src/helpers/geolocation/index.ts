import { useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { GeoOptions } from 'react-native-geolocation-service'
import { LocationInput } from '../../api/graphql'
import { getCurrentLocation } from './helper'
export { getCurrentLocation, useRequestGeolocation, requestLocationPermission } from './helper'

const LAST_KNOWN_LOCATION_CACHE = '@monio/LAST_KNOWN_LOCATION_CACHE'

export function useCurrentLocation(options? : GeoOptions) : LocationInput {
  const [location, setLocation] = useState<LocationInput>()

  const findWhereIAm = useCallback(async (options) => {
    const cachedLocation = await AsyncStorage.getItem(LAST_KNOWN_LOCATION_CACHE)
    if (cachedLocation) {
      setLocation(JSON.parse(cachedLocation))
    }

    const nextLocation = await getCurrentLocation(options)
    if (nextLocation) {
      setLocation(nextLocation)
      await AsyncStorage.setItem(LAST_KNOWN_LOCATION_CACHE, JSON.stringify(nextLocation))
    }
  }, [setLocation])

  useEffect(() => void findWhereIAm(options), [findWhereIAm, options])

  return location
}