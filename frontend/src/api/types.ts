import { ApolloClient } from 'apollo-client'

export class ApiBase {
  protected readonly client : ApolloClient<any>

  constructor(client : ApolloClient<any>) {
    this.client = client
  }
}