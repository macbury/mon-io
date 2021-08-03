import RootStore from '../stores/RootStore'
import MonioApi from '../api'
import logger from '../helpers/logger'

const log = logger('CheckUpdateTask')

/**
 * Check if there is new version of the app, and show notification about this
 * If there is no new version, try to refresh store data from server
 */
const CheckUpdateTask = async () => {
  log("Created")

  try {
    const store = new RootStore()
    const api = new MonioApi(store)

    log("Fetching session")
    store.api = api
    await store.session.reload()
    if (store.session.isSignedIn) {
      log("User signed in, checking for update")
      if (await store.ui.softwareUpdate.checkInBackground()) {
        log("We have a new update!")
      } else {
        log("No updates, lets use this to update all stores")
        await store.loadCache()
        await store.fetchAll()
      }
    } else {
      log("User not logged in")
    }
  } catch (error) {
    log('Could not refresh tokens, ignoring sync', error)
    return
  }

  log("Completed")
}

module.exports = CheckUpdateTask