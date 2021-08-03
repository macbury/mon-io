import createImportMutation from './mutations/createImport'
import importsQuery from './queries/imports'
import getImportQuery from './queries/getImport'
import updateImportMutation from './mutations/updateImport'
import destroyImportMutation from './mutations/destroyImport'

import { ApiBase } from './types'
import {
  Import,
  QueryGetImportArgs,
  QueryImportsArgs,
  CreateImportInput,
  UpdateImportInput,
  MutationCreateImportArgs,
  MutationDestroyImportArgs,
  MutationUpdateImportArgs,
  Mutation,
  Query,
  ImportConnection,
  CreateImportPayload,
  UpdateImportPayload,
  DestroyImportInput
} from './graphql'

export default class ImportsApi extends ApiBase {
  public async find(id: string, encoding?: string) : Promise<Import | null> {
    const { data: { getImport } } = await this.client.query<Query>({
      query: getImportQuery,
      variables: {
        id,
        encoding: encoding || ''
      }
    })

    return getImport
  }

  public async create(input : CreateImportInput) : Promise<CreateImportPayload> {
    try {
      const { data: { createImport } } = await this.client.mutate<Mutation, MutationCreateImportArgs>({
        mutation: createImportMutation,
        variables: { input }
      })

      return createImport
    } catch (error) {
      return {
        errors: [error.toString()],
        import: null
      }
    }
  }

  public async update(input : UpdateImportInput) : Promise<UpdateImportPayload> {
    try {
      const { data: { updateImport } } = await this.client.mutate<Mutation, MutationUpdateImportArgs>({
        mutation: updateImportMutation,
        variables: { input }
      })

      return updateImport
    } catch (error) {
      return {
        errors: [error.toString()],
        import: null
      }
    }
  }

  public async all(variables? : QueryImportsArgs) : Promise<ImportConnection> {
    const { data: { imports } } = await this.client.query<Query, QueryImportsArgs>({
      query: importsQuery,
      variables
    })

    return imports
  }

  public async destroy(input : DestroyImportInput) : Promise<boolean> {
    try {
      const { data: { destroyImport } } = await this.client.mutate<Mutation, MutationDestroyImportArgs>({
        mutation: destroyImportMutation,
        variables: { input }
      })

      return destroyImport.success
    } catch (error) {
      return false
    }
  }
}