import RootStore from '../stores/RootStore'
import MonioApi from '../api'
import logger from '../helpers/logger'

const log = logger('SyncDataWithBackend')

const SyncUploadReceiptsTask = async () => {
  log('Starting')

  const store = new RootStore()
  const api = new MonioApi(store)

  try {
    log("Syncing data")
    store.api = api
    await store.session.reload()

    if (store.session.isSignedIn) {
      await store.session.reload()
      await store.refresh()
    }
  } catch (error) {
    log('Could not refresh tokens, ignoring sync', error)
    return
  }

  log('Done')
}

module.exports = SyncUploadReceiptsTask