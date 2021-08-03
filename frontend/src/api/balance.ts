import { ApiBase } from './types'

import {
  Query,
  QueryBalanceArgs,
  Aggregation
} from './graphql'

import getBalanceHistoryQuery from './queries/getBalanceHistory'
import getCurrentBalanceQuery from './queries/getCurrentBalance'

export default class BalanceApi extends ApiBase {
  public async getHistory(categoryId: string) {
    const { data: { balance } } = await this.client.query<Query, QueryBalanceArgs>({
      query: getBalanceHistoryQuery,
      variables: { categoryId, aggregation: Aggregation.Sum }
    })

    return balance
  }

  public async getHistoryPerMonth(categoryId: string) {
    const { data: { balance } } = await this.client.query<Query, QueryBalanceArgs>({
      query: getBalanceHistoryQuery,
      variables: { categoryId, aggregation: Aggregation.None }
    })

    return balance
  }

  public async getToday(categoryId: string) {
    const { data: { balance } } = await this.client.query<Query, QueryBalanceArgs>({
      query: getCurrentBalanceQuery,
      variables: { categoryId }
    })

    return balance?.today
  }
}
