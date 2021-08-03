import BaseTransactionStore from './BaseTransactionStore'
import { action, observable, flow } from 'mobx'
import moment, { Moment } from 'moment-timezone'
import bind from 'bind-decorator'
import uuid from 'react-native-uuid'
import { Transaction, TransactionOrder, TransactionSeries, TransactionReceipt, QueryTransactionsArgs, TransactionImport } from '../../../api/graphql'
import logger from '../../../helpers/logger'

export const PER_PAGE = 40
/**
 * Search result contains all filter configurations and transactions that match that filter, all update and fetching is done inside this store
 */
export default class SearchResult extends BaseTransactionStore {
  private log = logger('SearchResult')
  @observable
  public categoriesIds : string[]
  @observable
  public paginationKey : string
  @observable
  private all : {
    [index: number]: Transaction
  } = {}
  @observable
  public totalCount : number = 0


  private pages : {
    [offset: number]: Promise<any>
  } = {}

  constructor(rootStore) {
    super(rootStore)
  }

  public contains(transactionId: string) {
    return Object.values(this.all).find(({ id }) => id === transactionId)
  }

  @action.bound
  public update(query : string, categoriesIds: string[], fromDate : Moment, toDate : Moment, importId : string, series: TransactionSeries, receipts: TransactionReceipt, imported: TransactionImport) {
    this.clear()
    this.importId = importId
    this.paginationKey = uuid.v4()
    this.query = query
    this.categoriesIds = categoriesIds
    this.fromDate = fromDate
    this.toDate = toDate
    this.series = series
    this.receipts = receipts
    this.imported = imported
    this.fetch(0)
  }

  private calculatePage = (index : number) => {
    return Math.floor(index / PER_PAGE)
  }

  @action
  public fetchPagesByIndexes = (startIndex : number, endIndex : number) => {
    const startPage = this.calculatePage(startIndex)
    const endPage = this.calculatePage(endIndex)

    for (let page = startPage; page <= endPage; page++) {
      this.fetch(page)
    }
  }

  @bind
  public getItem(index : number) {
    return this.all[index]
  }

  @bind
  public getFilterOptions() : QueryTransactionsArgs {
    return {
      receipt: this.receipts,
      series: this.series,
      import: this.imported,
      query: this.query.length > 0 ? this.query : null,
      order: TransactionOrder.Newest,
      categoryIds: this.categoriesIds,
      fromDate: this.fromDate.toISOString(true),
      toDate: this.toDate.toISOString(true),
      importId: this.importId
    }
  }

  public fetch = flow(function * (this : SearchResult, page : number | string) {
    const p = parseInt(page as any)

    if (this.pages[p]) {
      return null
    }

    this.log('TransactionStore fetch page', p)

    const after = p * PER_PAGE

    this.pages[p] = this.api.transactions.filter({
      ...this.getFilterOptions(),
      first: PER_PAGE,
      after: after.toString()
    })

    try {
      const {
        nodes,
        totalCount
      } = yield this.pages[p]

      for (let index = 0; index < nodes.length; index++) {
        const transaction : Transaction = nodes[index]
        this.all[index + after] = transaction
      }

      this.totalCount = totalCount
      this.paginationKey = uuid.v4()
      this.log('Pagination key is', this.paginationKey)
    } catch (e) {
      this.log('Could note fetch page', p)
      delete this.pages[p]
    }
    this.state = "Ready"
  }.bind(this))

  @action
  public clear(): void {
    this.imported = TransactionImport.All
    this.receipts = TransactionReceipt.All
    this.series = TransactionSeries.All
    this.state = "Loading"
    this.pages = {}
    this.totalCount = 0
    this.importId = null
    this.paginationKey = uuid.v4()
    this.query = ''
    this.categoriesIds = []
    this.fromDate = moment()
    this.toDate = moment()
  }
}