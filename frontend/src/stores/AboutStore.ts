import { action, flow, observable, computed } from 'mobx'
import logger from '../helpers/logger'
import SubStore from './SubStore'
import { About } from '../api/graphql'
import appInfo from '../about.json'

/**
 * Contains information about current running application like
 * - version of the code
 * - fetch information about code version from backend
 */
export default class AboutStore extends SubStore<any> {
  private readonly log = logger('AboutStore')
  @observable
  public clientCommitSha : String = appInfo.commit
  @observable
  public clientVersion : String = appInfo.monio_version
  @observable
  public serverCommitSha : String
  @observable
  public serverVersion : String

  public get cacheKey(): string {
    return 'about'
  }

  protected toBundle(): any {
    const {
      serverCommitSha,
      serverVersion
    } = this

    return {
      serverCommitSha,
      serverVersion
    }
  }

  protected loadBundle(data: any) {
    const {
      serverCommitSha,
      serverVersion
    } = data

    this.serverCommitSha = serverCommitSha
    this.serverVersion = serverVersion
  }

  public fetch = flow(function * (this : AboutStore) {
    try {
      const about = yield this.api.about.fetch()
      this.setAbout(about)
    } catch (e) {
      this.log('Could not refresh about information', e)
    }
  }.bind(this))

  /**
   * Information about backend version
   */
  public refresh = flow(function * (this : AboutStore) {
    yield this.restore()

    if (this.serverCommitSha && this.serverVersion) {
      this.log('Using about info from cache, and fetching new in background')
      this.fetch()
    } else {
      this.log('Waiting for new about info')
      yield this.fetch()
    }
  })

  @action
  public setAbout(about : About) {
    if (about) {
      this.serverCommitSha = about.commit
      this.serverVersion = about.monioVersion
      this.persist()
    }
  }

  @computed
  public get isUpdated() {
    return this.serverVersion && this.clientVersion && this.clientVersion !== this.serverVersion
  }

  @action
  public async clear() {
    this.state = "None"
  }
}