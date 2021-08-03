import { Balance } from '../../../api/graphql'
import BalanceStore from './BalanceStore'

export default class SavingsChartStore extends BalanceStore {
  public fetchBalances(): Promise<Balance>[] {
    return this.root.categories.savings.map(({ id }) => this.api.balance.getHistory(id))
  }

  public get cacheKey(): string {
    return 'SavingsChart'
  }
}