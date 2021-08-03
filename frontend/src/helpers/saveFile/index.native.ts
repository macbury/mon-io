import RNFS from 'react-native-fs'
import Share from "react-native-share";
import logger from '../logger'

const log = logger('saveFile')

export default async function saveFile(filename: string, dataUrl: string) : Promise<void> {
  const filePath = 'file://' + RNFS.CachesDirectoryPath + '/' + filename
  log('Saving file: ' + filePath)
  const data = dataUrl.split(",")[1]

  await RNFS.writeFile(filePath, data, 'base64')

  log('Done opening share dialog')

  await Share.open({
    title: 'Excel report',
    url: filePath
  })
}