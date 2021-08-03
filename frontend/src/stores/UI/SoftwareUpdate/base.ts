import { computed, observable, flow } from 'mobx'
import { NonPersistableStore } from '../../SubStore'

type SoftwareUpdateState = 'Downloading' | 'ReadyToInstall' | 'UpToDate'

export default class SoftwareUpdateStore extends NonPersistableStore {
  @observable
  public progress : number = 0
  @observable
  public refreshState : SoftwareUpdateState = 'UpToDate'

  @computed
  protected get apkVersionUrl() {
    if (this.root.session.endpointUrl) {
      return [this.root.session.endpointUrl, 'software_update'].join('/')
    } else {
      return null
    }
  }

  public check(force?: boolean) {

  }

  public checkInBackground() : Promise<any> {
    return
  }

  public clear(): void {

  }
}