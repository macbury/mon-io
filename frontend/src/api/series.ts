import { ApiBase } from './types'
import moment, { Moment } from 'moment-timezone'

import {
  MutationIgnoreRecurrenceArgs,
  MutationCreateRecurrenceArgs,
  MutationUpdateRecurrenceArgs,
  CreateRecurrenceInput,
  UpdateRecurrenceInput,
  Mutation,
  Query,
  QueryGetSeriesArgs,
  QueryPlannedTransactionsArgs
} from './graphql'

import createRecurrenceMutation from './mutations/createRecurrence'
import updateRecurrenceMutation from './mutations/updateRecurrence'
import ignoreRecurrenceMutation from './mutations/ignoreRecurrence'
import plannedTransactionsQuery from './queries/getPlannedTransactions'
import getSeriesQuery from './queries/getSeries'
import seriesQuery from './queries/series'
import getCalendarUrlQuery from './queries/getCalendarUrl'

export default class SeriesApi extends ApiBase {
  public async create(input : CreateRecurrenceInput) {
    try {
      await this.client.mutate<Mutation, MutationCreateRecurrenceArgs>({
        mutation: createRecurrenceMutation,
        variables: { input }
      })

      return { errors: [] }
    } catch (error) {
      return { errors: [error.toString()] }
    }
  }

  public async update(input : UpdateRecurrenceInput) {
    try {
      const { data: { updateRecurrence } } = await this.client.mutate<Mutation, MutationUpdateRecurrenceArgs>({
        mutation: updateRecurrenceMutation,
        variables: { input }
      })

      return updateRecurrence
    } catch (error) {
      return { errors: [error.toString()] }
    }
  }

  public async getCalendarUrl() {
    try {
      const { data } = await this.client.query<Query>({
        query: getCalendarUrlQuery
      })

      return (data as any)?.me?.settings?.calendarUrl
    } catch (error) {
      return null
    }
  }

  public async find(id : string) {
    const { data: { getSeries } } =  await this.client.query<Query, QueryGetSeriesArgs>({
      query: getSeriesQuery,
      variables: { id }
    })

    return getSeries
  }

  public async ignoreDate(seriesId : string, date : string | Moment) {
    const atDate = moment(date).format('YYYY-MM-DD')
    try {
      const { data: { ignoreRecurrence } } = await this.client.mutate<Mutation, MutationIgnoreRecurrenceArgs>({
        mutation: ignoreRecurrenceMutation,
        variables: { input: { seriesId, atDate } }
      })

      return { errors: ignoreRecurrence.errors }
    } catch (error) {
      return { errors: [error.toString()] }
    }
  }

  public async all() {
    const { data: { series } } =  await this.client.query<Query>({
      query: seriesQuery
    })

    return series?.nodes
  }

  public async getPlannedTransactions(date : string | Moment, all = false) {
    const month = moment(date).format('YYYY-MM-DD')

    const { data: { plannedTransactions } } =  await this.client.query<Query, QueryPlannedTransactionsArgs>({
      query: plannedTransactionsQuery,
      variables: { month, all }
    })

    return plannedTransactions
  }
}
