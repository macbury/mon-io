import { action, flow, observable } from 'mobx'
import { NonPersistableStore } from '../SubStore'

export default class ApiExplorerStore extends NonPersistableStore {
  @observable
  public accessToken : string

  public fetch = flow(function * (this : ApiExplorerStore, refreshTokenId: string) {
    this.state = "Loading"

    this.accessToken = yield this.api.sessions.getLongLivingToken(refreshTokenId)
    if (this.accessToken) {
      this.state = "Ready"
    } else {
      this.state = "NotFound"
    }
  }.bind(this))

  @action.bound
  public async clear() {
    this.state = "None"
  }
}