import { Balance } from '../../../api/graphql'
import BalanceStore from './BalanceStore'

/**
 * Fetch information how much user pays per month
 */
export default class LoansChartStore extends BalanceStore {
  protected adjustCents(cents : number) {
    return Math.abs(cents)
  }

  public fetchBalances(): Promise<Balance>[] {
    return this.root.categories.loans.map(({ id }) => this.api.balance.getHistoryPerMonth(id))
  }
  
  public get cacheKey(): string {
    return 'LoansChart'
  }
}