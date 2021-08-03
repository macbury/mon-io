import { ReactNativeFile } from 'apollo-upload-client'
import path from 'path'
import mime from 'react-native-mime-types'
import { SyncQueue } from '../modules/SyncUploadReceiptsModule'
import RootStore from '../stores/RootStore'
import MonioApi from '../api'
import logger from '../helpers/logger'

const log = logger('SyncUploadReceiptsTask')

const SyncUploadReceiptsTask = async () => {
  log('Starting SyncUploadReceiptTask')
  const queue = new SyncQueue()
  const store = new RootStore()
  const api = new MonioApi(store)

  try {
    log("Ensuring tokens are ok")
    store.api = api
    await store.session.reload()
    await store.session.refreshServerToken()
  } catch (error) {
    log('Could not refresh tokens, ignoring sync', error)
    return
  }

  log("Starting processing items: ", await queue.getSize())
  while (true) {
    const item = await queue.peek()

    if (item == null) {
      log('Finished processing queue')
      break
    }

    log('Processing:', item)

    const {
      fileUri,
      error,
      ...restReceiptParams
    } = item

    const name = path.basename(fileUri)
    const type = mime.lookup(fileUri)

    const file = new ReactNativeFile({
      uri: fileUri,
      name,
      type
    })

    const { receipt, errors } = await api.receipts.createReceipt({
      file,
      ...restReceiptParams
    })

    if (errors.length > 0) {
      log('Could not save receipt', errors)
      item.error = errors.join(',')
      await queue.update(item)
      break
    } else {
      await queue.remove(item.clientMutationId)
      queue.emit(receipt)
      log('Success upload for', item)
    }
  }

  log('Stop SyncUploadReceiptTask')
}

module.exports = SyncUploadReceiptsTask