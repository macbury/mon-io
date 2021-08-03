import { flow, observable, computed, action } from 'mobx'
import moment from 'moment-timezone'
import _ from 'underscore'
import SubStore from '../../SubStore'
import { Balance, BalancePeriod } from '../../../api/graphql'

export interface SavingChartBundle {
  entries : BalancePeriod[]
}

function buildEntriesFromMultipleHistories(categorySavingHistories : Balance[]) : BalancePeriod[] {
  const histories = categorySavingHistories.map(({ history }) => history)
  const balances = {}

  for (let h = 0; h < histories.length; h++) {
    const entries = histories[h];
    
    for (let e = 0; e < entries.length; e++) {
      const { month, exchangedValue } = entries[e];
      if (balances[month]) {
        balances[month] = { ...exchangedValue, cents: balances[month].cents + exchangedValue.cents }
      } else {
        balances[month] = exchangedValue
      }
    }
  }

  const entries = Object.keys(balances).map((month) => ({ month: moment(month), exchangedValue: balances[month] })).sort((a : any, b : any) => a.month - b.month)

  return entries as BalancePeriod[]
}

/**
 * Base store used for displaying charts of change in balance
 */
export default abstract class BalanceChartStore extends SubStore<SavingChartBundle> {
  @observable
  private entries : BalancePeriod[] = []
  
  @computed
  public get currency() {
    return this.entries[0]?.exchangedValue?.currency || this.root.settings.mainCurrency
  }

  @computed
  public get chartData() {
    return this.entries.reverse().map(({ month, exchangedValue }) => {
      const x = moment(month).toDate()
      return { x, y: this.adjustCents(exchangedValue.cents) }
    })
  }

  protected adjustCents(cents : number) {
    return cents
  }

  /**
   * List of categories used in query for fetching balances
   */
  public abstract fetchBalances() : Promise<Balance>[];

  public refresh = flow(function * (this : BalanceChartStore, months : number) {
    if (this.isLoading || this.isRefreshing) {
      return
    }

    yield this.restore()
    this.state = this.entries.length > 0 ? "Refreshing" : "Loading"
    
    yield this.root.categories.ensureExists()

    const balances : Balance[] = yield Promise.all(this.fetchBalances())
    
    this.entries = buildEntriesFromMultipleHistories(balances)

    yield this.persist()
    this.state = "Ready"
  }.bind(this))
  
  @action.bound
  public clear(): void {
    this.entries = []
    this.state = "Loading"
  }

  //#region Persist data
  protected toBundle() {
    return {
      entries: this.entries
    }
  }

  protected loadBundle({ entries }: SavingChartBundle): void {
    this.entries = entries
  }
  //#endregion
}