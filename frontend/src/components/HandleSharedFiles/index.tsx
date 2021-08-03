import { useEffect, useCallback, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { ReceiveFileModule } from '../../modules/ReceiveFileModule'
import { useStoreData } from '../../stores'
import logger from '../../helpers/logger'

const log = logger('HandleSharedFiles')

/**
 * Checks if somebody did share file or tried to open one with the android application, then add it to upload queue
 */
export default function HandleSharedFiles() {
  const { saveFile, isSignedIn } = useStoreData(({ screens: { createReceipt }, session }) => ({
    isSignedIn: session.isSignedIn,
    saveFile: createReceipt.submitUri
  }))

  const createReceiptsFromSharedFiles = useCallback(async () => {
    if (!isSignedIn) {
      log('Files were shared, but we are not signed in...')
      return
    }
    const files = await ReceiveFileModule.getSharedFile()

    log('We got this files ', files)
    await Promise.all(files.map(saveFile))
    log('File saved')
  }, [saveFile, isSignedIn])

  useEffect(() => {
    AppState.addEventListener('focus', createReceiptsFromSharedFiles)
    createReceiptsFromSharedFiles()
    return () => {
      AppState.removeEventListener('focus', createReceiptsFromSharedFiles)
    }
  }, [createReceiptsFromSharedFiles])

  return null
}