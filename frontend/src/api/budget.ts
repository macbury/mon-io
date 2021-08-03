import { ApiBase } from './types'
import { Moment } from 'moment-timezone'
import bind from 'bind-decorator'
import getBudgetQuery from './queries/getBudget'
import nextMonthQuery from './queries/summary/nextMonth'
import updateCategoryBudgetMutation from './mutations/updateCategoryBudget'

import {
  Query,
  Mutation,
  QueryGetBudgetArgs,
  UpdateCategoryBudgetInput,
  MutationUpdateCategoryBudgetArgs,
  QuerySummaryArgs
} from './graphql'

export default class BudgetApi extends ApiBase {
  public fetch = async (id : string) => {
    const { data } = await this.client.query<Query, QueryGetBudgetArgs>({
      query: getBudgetQuery,
      variables: { id }
    })

    return data.getBudget
  }

  @bind
  public async nextMonth(date : Moment) {
    const { data } = await this.client.query<Query, QuerySummaryArgs>({
      query: nextMonthQuery,
      variables: { date: date.format('YYYY-MM-01') }
    })

    return data.summary.nextMonth
  }

  @bind
  public async updateCategoryBudget(attributes : UpdateCategoryBudgetInput) {
    const { data: { updateCategoryBudget } } = await this.client.mutate<Mutation, MutationUpdateCategoryBudgetArgs>({
      mutation: updateCategoryBudgetMutation,
      variables: { input: attributes }
    })

    return updateCategoryBudget
  }
}