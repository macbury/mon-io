import { ApiBase } from './types'
import categoriesSummaryQuery from './queries/summary/categories'
import incomeExpenseChartQuery from './queries/summary/incomeExpense'
import loansQuery from './queries/summary/loans'

import {
  Query,
  Summary,
  TransactionCategoryKind,
  QuerySummaryArgs,
  SummaryCategoriesArgs,
  CategorySummary
} from './graphql'

export default class SummaryApi extends ApiBase {
  public async fetchCategoriesSummary(date : string, type : TransactionCategoryKind) : Promise<CategorySummary[]> {
    return (await this.fetch(date, type)).categories
  }

  public async fetch(date : string, type : TransactionCategoryKind) : Promise<Summary> {
    const { data: { summary } } = await this.client.query<Query, QuerySummaryArgs | SummaryCategoriesArgs>({
      query: categoriesSummaryQuery,
      variables: { date, filter: type },
    })

    return summary
  }

  public async incomeExpense(date : string) : Promise<Summary> {
    const { data: { summary } } = await this.client.query<Query, QuerySummaryArgs | SummaryCategoriesArgs>({
      query: incomeExpenseChartQuery,
      variables: { date },
    })

    return summary
  }

  public async loans(date : string) : Promise<Summary> {
    const { data: { summary } } = await this.client.query<Query, QuerySummaryArgs | SummaryCategoriesArgs>({
      query: loansQuery,
      variables: { date },
    })

    return summary
  }
}
