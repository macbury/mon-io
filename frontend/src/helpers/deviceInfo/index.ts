import DeviceInfo from 'react-native-device-info'

export function getDeviceName() : Promise<String> {
  return DeviceInfo.getDeviceName()
}