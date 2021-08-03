import { ApiBase } from './types'

import {
  UpdateMetadataUrlInput,
  MutationUpdateTransactionArgs,
  MutationCreateTransactionArgs,
  MutationDestroyTransactionArgs,
  Mutation,
  Query,
  QueryTransactionsArgs,
  QueryGetTransactionArgs,
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionCategoryKind,
  TransactionsExcel,
  MutationUpdateMetadataUrlArgs,
} from './graphql'

import getTransactionsQuery from './queries/getTransactions'
import getTransactionsReportQuery from './queries/getTransactionsReport'
import getTransactionQuery from './queries/getTransaction'
import createTransactionMutation from './mutations/createTransaction'
import updateTransactionMutation from './mutations/updateTransaction'
import destroyTransactionMutation from './mutations/destroyTransaction'
import updateMetadataUrlMutation from './mutations/updateMetadataUrl'

export default class TransactionsApi extends ApiBase {
  public async destroy(transactionId : string) {
    try {
      await this.client.mutate<Mutation, MutationDestroyTransactionArgs>({
        mutation: destroyTransactionMutation,
        variables: { input: { id: transactionId } }
      })

      return { errors: [] }
    } catch (error) {
      return { errors: [error.toString()] }
    }
  }

  public async updateMetadataUrl(input : UpdateMetadataUrlInput) {
    try {
      const { data: { updateMetadataUrl } } = await this.client.mutate<Mutation, MutationUpdateMetadataUrlArgs>({
        mutation: updateMetadataUrlMutation,
        variables: { input }
      })

      return updateMetadataUrl
    } catch (error) {
      return { errors: [error.toString()], transaction: null }
    }
  }

  public async update(input : UpdateTransactionInput) {
    try {
      const { data: { updateTransaction } } = await this.client.mutate<Mutation, MutationUpdateTransactionArgs>({
        mutation: updateTransactionMutation,
        variables: { input }
      })

      return updateTransaction
    } catch (error) {
      return { errors: [error.toString()], transaction: null }
    }
  }

  public async create(input : CreateTransactionInput) {
    try {
      const { data: { createTransaction } } = await this.client.mutate<Mutation, MutationCreateTransactionArgs>({
        mutation: createTransactionMutation,
        variables: { input }
      })

      return createTransaction
    } catch (error) {
      return { errors: [error.toString()], transaction: null }
    }
  }

  public async fetch(month : string, type : TransactionCategoryKind) {
    const { data: { transactions } } = await this.client.query<Query, QueryTransactionsArgs>({
      query: getTransactionsQuery,
      variables: { month, filter: type }
    })

    return transactions.nodes
  }

  public async filter(variables? : QueryTransactionsArgs) {
    const { data: { transactions } } = await this.client.query<Query, QueryTransactionsArgs>({
      query: getTransactionsQuery,
      variables
    })

    return transactions
  }

  public async transactionsReport(variables? : QueryTransactionsArgs) : Promise<TransactionsExcel> {
    const { data: { transactions } } = await this.client.query<Query, QueryTransactionsArgs>({
      query: getTransactionsReportQuery,
      variables
    })

    return transactions.report
  }

  public async find(id : string) {
    const { data: { getTransaction } } = await this.client.query<Query, QueryGetTransactionArgs>({
      query: getTransactionQuery,
      variables: { id }
    })

    return getTransaction
  }
}
