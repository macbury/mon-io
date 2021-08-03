import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from "apollo-link-http"
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError, ErrorResponse } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'

import promiseToObservable from '../helpers/promiseToObservable'
import ApolloRefreshToken from '../helpers/ApolloRefreshToken'
import logger from '../helpers/logger'
import RootStore from '../stores/RootStore'

import BalanceApi from './balance'
import CategoriesApi from './categories'
import ReceiptsApi from './receipts'
import SessionsApi from './session'
import TransactionsApi from './transactions'
import SummaryApi from './summary'
import AboutApi from './about'
import SeriesApi from './series'
import BudgetApi from './budget'
import ImportsApi from './imports'
import LocationApi from './location'

import hasFiles from '../helpers/hasFiles'

export default class MonioApi {
  private readonly log = logger('MonioApi')

  public readonly categories : CategoriesApi
  public readonly receipts : ReceiptsApi
  public readonly sessions : SessionsApi
  public readonly transactions : TransactionsApi
  public readonly summary : SummaryApi
  public readonly about : AboutApi
  public readonly budget : BudgetApi
  public readonly series : SeriesApi
  public readonly location : LocationApi
  public readonly imports : ImportsApi
  public readonly balance : BalanceApi

  private cache : InMemoryCache
  private store : RootStore
  private apolloRefreshToken : ApolloRefreshToken

  public client : ApolloClient<any>

  constructor(store : RootStore, client? : ApolloClient<any>) {
    this.store = store

    if (client) {
      this.client = client
    } else {
      this.setupClient()
    }

    this.categories = new CategoriesApi(this.client)
    this.receipts = new ReceiptsApi(this.client)
    this.sessions = new SessionsApi(this.client)
    this.transactions = new TransactionsApi(this.client)
    this.summary = new SummaryApi(this.client)
    this.about = new AboutApi(this.client)
    this.budget = new BudgetApi(this.client)
    this.series = new SeriesApi(this.client)
    this.location = new LocationApi(this.client)
    this.imports = new ImportsApi(this.client)
    this.balance = new BalanceApi(this.client)
  }

  private get linkOptions() {
    return {
      credentials: 'omit',
      fetch: this.apiFetch,
      fetchOptions: {
        method: 'POST',
        mode: 'cors'
      }
    }
  }

  private createHttpLink() {
    if (process.env.NODE_ENV == 'development') {
      return createHttpLink(this.linkOptions)
    } else {
      return new BatchHttpLink(this.linkOptions)
    }
  }

  private setupClient() {
    this.cache = new InMemoryCache()

    const uploadLink = createUploadLink(this.linkOptions)

    const httpLink = ApolloLink.split(
      ({ variables }) => hasFiles(variables),
      uploadLink,
      this.createHttpLink(),
    );

    this.apolloRefreshToken = new ApolloRefreshToken(this.store.session)

    const link = ApolloLink.from([
      this.onLoadingLink,
      this.onErrorLink,
      httpLink
    ])

    this.client = new ApolloClient({
      link,
      cache: this.cache,
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
        },
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        }
      }
    })
  }

  private apiFetch = async (_uri, options : RequestInit) => {
    // @ts-ignore
    options.headers.Authorization = 'Token token=' + this.store.session.accessToken
    // @ts-ignore
    options.headers.MonioClientVersion = this.store.about.clientVersion
    return fetch(this.store.session.endpointUrl, options)
  }

  private onLoadingLink = new ApolloLink((operation, forward) => {
    this.store.processing = true
    return forward(operation).map(response => {
      this.store.processing = false
      return response
    })
  })

  private onErrorLink = onError(({ graphQLErrors, networkError, forward, operation } : any) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        this.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) {
      // @ts-ignore
      const { statusCode } = networkError

      if (statusCode === 400) {
        this.log(`[Outdated api error]: ${networkError}`)
        this.store.updateRequired = true
      } else if (statusCode === 401) {
        this.log("Refreshing access token!")
        return promiseToObservable(this.apolloRefreshToken.refreshToken()).flatMap((resp) => forward(operation))
      } else {
        this.log(`[Network error]: ${networkError}`, networkError?.result)
        this.store.processing = false
        this.store.setError(networkError?.result?.error)
      }
    }
  })
}