import bind from 'bind-decorator'
import { ApiBase } from './types'
import allCategoriesQuery from './queries/categories/all'
import updateCategoryMutation from './mutations/updateCategory'
import createCategoryMutation from './mutations/createCategory'

import {
  Query,
  Mutation,
  UpdateCategoryInput,
  MutationUpdateCategoryArgs,
  CreateCategoryInput,
  MutationCreateCategoryArgs
} from './graphql'

export default class CategoriesApi extends ApiBase {
  @bind
  public async getAllCategories() {
    const { data } = await this.client.query<Query>({
      query: allCategoriesQuery
    })

    return data.allCategories.nodes
  }

  @bind
  public async create(input : CreateCategoryInput) {
    try {
      const { data } = await this.client.mutate<Mutation, MutationCreateCategoryArgs>({
        mutation: createCategoryMutation,
        variables: {
          input
        }
      })

      return data.createCategory
    } catch (e) {
      return {
        category: null,
        errors: [e.toString()]
      }
    }
  }

  @bind
  public async update(input : UpdateCategoryInput) {
    try {
      const { data } = await this.client.mutate<Mutation, MutationUpdateCategoryArgs>({
        mutation: updateCategoryMutation,
        variables: {
          input
        }
      })

      return data.updateCategory
    } catch (e) {
      return {
        category: null,
        errors: [e.toString()]
      }
    }
  }
}