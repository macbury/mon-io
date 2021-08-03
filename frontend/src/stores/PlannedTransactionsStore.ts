import { action, flow, observable, computed } from 'mobx'
import moment from 'moment-timezone'
import SubStore from './SubStore'
import { PlannedTransaction } from '../api/graphql'
import logger from '../helpers/logger'

export default class PlannedTransactionsStore extends SubStore<any> {
  private readonly log = logger('PlannedTransactionsStore')
  private refreshRequest : Promise<Array<PlannedTransaction>>
  @observable
  public transactions : Array<PlannedTransaction> = []

  public get cacheKey(): string {
    return 'plannedTransactions'
  }

  protected toBundle() {
    const {
      transactions
    } = this

    return {
      transactions
    }
  }
  protected loadBundle({ transactions }: any) {
    this.transactions = transactions
  }

  /**
   * Information about backend version
   */
  public refresh = flow(function * (this : PlannedTransactionsStore) {
    yield this.restore()

    if (this.transactions.length === 0) {
      this.log('Waiting for data from server')
      yield this.fetch()
    } else {
      this.log('Using cache data, and fetching in background')
      this.fetch()
    }
  })

  public fetch = flow(function * (this : PlannedTransactionsStore) {
    if (this.refreshRequest) {
      return
    }

    try {
      this.state = "Loading"
      this.refreshRequest = this.api.series.getPlannedTransactions(moment())
      this.transactions = yield this.refreshRequest

      yield this.persist()
    } catch (e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: this.refresh
      })
    } finally {
      this.refreshRequest = null
      this.state = "Ready"
    }
  })

  public ignoreDate = flow(function * (this : PlannedTransactionsStore, seriesId : string, date : string) {
    yield this.api.series.ignoreDate(seriesId, date)
    yield this.refresh()
  }.bind(this))

  @action
  public async clear() {
    this.refreshRequest = null
    this.state = "None"
  }
}