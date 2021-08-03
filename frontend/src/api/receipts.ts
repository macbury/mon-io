import { ApiBase } from './types'
import createReceiptMutation from './mutations/createReceipt'
import getPendingReceiptsQuery from './queries/pendingReceipts'
import updateReceiptMutation from './mutations/updateReceipt'
import destroyReceiptMutation from './mutations/destroyReceipt'
import getReceiptQuery from './queries/getReceipt'

import {
  Query,
  Mutation,
  UpdateReceiptInput,
  CreateReceiptInput,
  MutationCreateReceiptArgs,
  MutationUpdateReceiptArgs,
  MutationDestroyReceiptArgs,
  QueryGetReceiptArgs
} from './graphql'

export default class ReceiptsApi extends ApiBase {
  public async createReceipt(input : CreateReceiptInput) {
    try {
      const { data: { createReceipt } } = await this.client.mutate<Mutation, MutationCreateReceiptArgs>({
        mutation: createReceiptMutation,
        variables: { input }
      })

      return createReceipt
    } catch (error) {
      return { errors: [error.toString()], receipt: null }
    }
  }

  public async getAll() {
    const { data } = await this.client.query<Query>({ query: getPendingReceiptsQuery })
    return data.pendingReceipts.nodes
  }

  public async updateReceipt(input : UpdateReceiptInput) {
    const response = await this.client.mutate<Mutation, MutationUpdateReceiptArgs>({
      mutation: updateReceiptMutation,
      variables: { input }
    })

    const { data: { updateReceipt } } = response

    return updateReceipt
  }

  public async fetchReceipt(receiptId : string) {
    const { data: { getReceipt } } = await this.client.query<Query, QueryGetReceiptArgs>({
      query: getReceiptQuery,
      variables: {
        id: receiptId
      }
    })
    return getReceipt
  }

  public async destroyReceipt(receiptId : string) {
    await this.client.mutate<Mutation, MutationDestroyReceiptArgs>({
      mutation: destroyReceiptMutation,
      variables: {
        input: {
          id: receiptId
        }
      }
    })
  }
}
