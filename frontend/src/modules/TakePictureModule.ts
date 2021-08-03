import { NativeModules, PermissionsAndroid } from 'react-native'
import { ReactNativeFile } from 'apollo-upload-client'

interface ITakePictureModule {
  take() : Promise<string>
}


const TakePictureModule = NativeModules.TakePictureModule as ITakePictureModule

export async function takePicture() {
  if (!(await PermissionsAndroid.check('android.permission.CAMERA'))) {
    await PermissionsAndroid.request('android.permission.CAMERA')
  }

  const fileUri = await TakePictureModule.take()

  if (fileUri) {
    const file = new ReactNativeFile({
      uri: fileUri,
      name: 'Receipt Scan.jpeg',
      type: 'image/jpeg'
    })

    return file
  } else {
    return null
  }
}