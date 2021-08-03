import { ReactNativeFile } from 'apollo-upload-client'
import { action, flow } from 'mobx'
import uuid from 'react-native-uuid'

import { NonPersistableStore } from '../SubStore'
import { getCurrentLocation } from '../../helpers/geolocation'

export default class CreateReceiptStore extends NonPersistableStore {
  /**
   * Create new receipt on the backend and add it to current list of receipts
   */
  public submit = flow(function * (this : CreateReceiptStore, file : ReactNativeFile | File) {
    yield this.submitUri(file.uri)
  }.bind(this))

  public submitUri = flow(function * (this : CreateReceiptStore, fileUri: string) {
    this.state = "Saving"
    try {
      this.ui.notifications.showSuccess('success.receipts.upload')
      const location = yield getCurrentLocation({ enableHighAccuracy: true })

      yield this.root.screens.uploadReceipts.add({
        createdAt: new Date(),
        clientMutationId: uuid.v4(),
        location,
        fileUri
      })
    } catch (e) {
      this.ui.notifications.showError(e)
    }

    this.state = "Ready"
  }.bind(this))

  @action public async clear() {
    this.state = "None"
  }
}