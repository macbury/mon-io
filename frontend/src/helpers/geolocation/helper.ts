import { useEffect, useState } from 'react'
import { PermissionsAndroid } from 'react-native'
import Geolocation, { GeoPosition, GeoOptions } from 'react-native-geolocation-service'
import { LocationInput } from '../../api/graphql'

export function useRequestGeolocation() {
  useEffect(() => { requestLocationPermission() })
}

export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      'android.permission.ACCESS_FINE_LOCATION',
      {
        title: 'Missing location permission',
        message: 'We can add your current location to receipt',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

function promiseGetCurrentPosition(options) : Promise<GeoPosition | Position> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      resolve,
      reject,
      options
    )
  })
}

export async function getCurrentLocation(options? : GeoOptions) : Promise<LocationInput> {
  if (await requestLocationPermission()) {
    const data = await promiseGetCurrentPosition(options)

    if (data) {
      const { coords: { latitude, longitude } } = data
      return  { lat: latitude, lng: longitude }
    } else {
      return null
    }
  } else {
    return null
  }
}

