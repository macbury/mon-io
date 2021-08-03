import { ApiBase } from './types'

import signInMutation from './mutations/signIn'
import createLongLivingTokenMutation from './mutations/createLongLivingToken'
import quickLoginTokenMutation from './mutations/quickLoginToken'
import quickSignInTokenMutation from './mutations/quickSignIn'
import refreshAccessTokenMutation from './mutations/refreshAccessToken'
import destroyRefreshToken from './mutations/destroyRefreshToken'
import getLongLivingTokenQuery from './queries/getLongLivingToken'
import meQuery from './queries/me'
import getSessionsQuery from './queries/getSessions'
import getNonceQuery from './queries/nonce'
import logoutMutation from './mutations/logout'
import logger from '../helpers/logger'
import { TProofOfWorkResult } from '../helpers/proofOfWork'

import {
  MutationDestroyRefreshTokenArgs,
  MutationQuickLoginTokenArgs,
  MutationSignInArgs,
  MutationCreateLongLivingTokenArgs,
  Mutation,
  Query,
  SignInPayload,
  RefreshAccessTokenInput,
  QuickSignInPayload,
  MutationQuickSignInArgs,
  CreateLongLivingTokenPayload,
  QueryGetLongLivingTokenArgs,
  User,
  Session
} from './graphql'

export default class SessionsApi extends ApiBase {
  private log = logger('SessionsApi')

  public async destroy(refreshTokenId : string) : Promise<boolean> {
    const {
      data: { destroyRefreshToken: { success } }
    } = await this.client.mutate<Mutation, MutationDestroyRefreshTokenArgs>({
      mutation: destroyRefreshToken,
      variables: {
        input: {
          id: refreshTokenId
        }
      }
    })

    return success
  }

  public async generateQuickLoginToken(refreshToken) : Promise<String> {
    const {
      data: {
        quickLoginToken: {
          token
        }
      }
    } = await this.client.mutate<Mutation, MutationQuickLoginTokenArgs>({
      mutation: quickLoginTokenMutation,
      variables: {
        input: { refreshToken }
      }
    })
    return token
  }

  public async logout() {
    try {
      await this.client.mutate<Mutation>({ mutation: logoutMutation })
    } catch (e) {
      this.log('could not logout', e)
    }
  }

  public async me() : Promise<User> {
    const response = await this.client.query<Query>({ query: meQuery })
    return response.data.me
  }

  public async nonce() : Promise<string> {
    const response = await this.client.query<Query>({ query: getNonceQuery })
    return response.data.nonce
  }

  public async all() {
    const {
      data: {
        me: {
          refreshTokens,
          longLivingRefreshTokens
        }
      }
    } = await this.client.query<Query>({ query: getSessionsQuery })

    return {
      refreshTokens,
      longLivingRefreshTokens
    }
  }

  public async signIn(username : string, password : string, deviceName : string, proofOfWork: TProofOfWorkResult) : Promise<SignInPayload> {
    const variables : MutationSignInArgs = {
      input: {
        username,
        password,
        name: deviceName,
        proofOfWork
      }
    }

    try {
      const response = await this.client.mutate<Mutation, MutationSignInArgs>({
        mutation: signInMutation,
        variables
      })

      const { data: { signIn } } = response

      return signIn
    } catch (e) {
      return { errors: [e.toString()] }
    }
  }

  public async quickSignIn(token : string, name: string) : Promise<QuickSignInPayload> {
    try {
      const { data } = await this.client.mutate<Mutation, MutationQuickSignInArgs>({
        mutation: quickSignInTokenMutation,
        variables: { input: { token, name } }
      })

      return data.quickSignIn
    } catch (e) {
      return { errors: [e.toString()] }
    }
  }

  public async refreshAccessToken(refreshToken : string) {
    const variables : RefreshAccessTokenInput = {
      refreshToken
    }

    const { data: { refreshAccessToken: { accessToken, errors } } } = await this.client.mutate<Mutation, RefreshAccessTokenInput>({
      mutation: refreshAccessTokenMutation,
      variables
    })

    return (errors.length > 0) ? null : accessToken
  }

  public async createLongLivingToken(name : string) : Promise<CreateLongLivingTokenPayload> {
    const { data } = await this.client.mutate<Mutation, MutationCreateLongLivingTokenArgs>({
      mutation: createLongLivingTokenMutation,
      variables: { input: { name } }
    })

    return data.createLongLivingToken
  }

  public async getLongLivingToken(id: string) {
    const {
      data: {
        getLongLivingToken
      }
    } = await this.client.query<Query, QueryGetLongLivingTokenArgs>({ query: getLongLivingTokenQuery, variables: { id } })

    return getLongLivingToken
  }
}
