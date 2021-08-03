import { action, flow, observable } from 'mobx'
import { Import, ImportConnection, ImportStateEnum } from '../../api/graphql'
import SubStore from '../SubStore'

export default class ImportsStore extends SubStore<any> {
  @observable
  public all : Import[] = null
  @observable
  public pending : Import[] = null

  /**
   * Find import by id
   */
  public find = flow(function * (this : ImportsStore, importId: string) {
    let importData = this.all.find(({ id }) => (importId === id))

    if (importData) {
      return importData
    }

    return yield this.api.imports.find(importId)
  }.bind(this))

  public refresh = flow(function * (this : ImportsStore) {
    if (this.all === null) {
      yield this.fetchAll()
      yield this.fetchPending()
    } else {
      this.fetchAll()
      this.fetchPending()
    }
  }.bind(this))

  private fetchAll = flow(function * (this : ImportsStore) {
    this.state = !this.all || this.all.length === 0 ? 'Loading' : 'Refreshing'

    try {
      const { nodes } : ImportConnection = yield this.api.imports.all({ state: ImportStateEnum.All })
      this.all = nodes

      yield this.persist()
    } catch (e) {
      this.ui.notifications.showError(e, this.fetchAll)
    } finally {
      this.state = 'Ready'
    }
  }.bind(this))

  public fetchPending = flow(function * (this : ImportsStore) {
    this.state = this.pending ? 'Loading' : 'Refreshing'

    try {
      const { nodes } : ImportConnection = yield this.api.imports.all({ state: ImportStateEnum.NotProcessed })
      this.pending = nodes

      yield this.persist()
    } catch (e) {
      this.ui.notifications.showError(e, this.fetchPending)
    } finally {
      this.state = 'Ready'
    }
  }.bind(this))

  @action.bound
  public clear() {
    this.all = this.pending = null
  }

  get cacheKey(): string {
    return 'imports'
  }

  protected toBundle() {
    const {
      all, pending
    } = this

    return {
      all, pending
    }
  }

  protected loadBundle({ all, pending }): void {
    this.all = all
    this.pending = pending
  }
}