import { ApiBase } from './types'
import aboutQuery from './queries/about'
import {
  Query
} from './graphql'

export default class AboutApi extends ApiBase {
  public fetch = async () => {
    const { data } = await this.client.query<Query>({
      query: aboutQuery
    })

    return data.about
  }
}