import { action, flow, observable, computed, runInAction } from 'mobx'
import moment, { Moment } from 'moment-timezone'
import SubStore from '../../SubStore'
import { CategorySummary, Transaction, TransactionCategoryKind } from '../../../api/graphql'
import TransactionPeriod from './TransactionPeriod'
import logger from '../../../helpers/logger'

export default class SummaryPeriod extends SubStore<any> {
  private log = logger('SummaryPeriod')
  @observable
  public date : Moment = null
  @observable
  public categories : CategorySummary[]
  @observable
  public transactions : Transaction[]
  @observable
  public type : TransactionCategoryKind = TransactionCategoryKind.Expense

  constructor(root, date : Moment, type : TransactionCategoryKind) {
    super(root)
    this.date = moment(date)
    this.type = type
  }

  @computed
  public get isEmpty() {
    return !this.categories && !this.transactions
  }

  public refresh = flow(function * (this : SummaryPeriod) {
    if (this.isLoading || this.isRefreshing) {
      this.log('Already refreshing summary for date', this.formattedCurrentDate)
      return
    } else {
      this.log('Refreshing summary for', this.formattedCurrentDate)
    }

    yield this.restore()

    if (!this.categories || !this.transactions) {
      this.log('Waiting for data')
      yield this.fetch()
    } else {
      this.log('Refreshing data in background')
      this.fetch()
    }
  }.bind(this))

  public fetch = flow(function * (this : SummaryPeriod) {
    try {
      this.categories = yield this.api.summary.fetchCategoriesSummary(this.formattedCurrentDate, this.type)
      this.transactions = yield this.api.transactions.fetch(this.formattedCurrentDate, this.type)

      yield this.persist()
    } catch (e) {
      this.log('Could not fetch summary period', e)
    }
  })

  private get sortedTransactions() {
    return this.transactions.sort((a, b) => {
      return moment(a.date).valueOf() - moment(b.date).valueOf()
    })
  }

  /**
   * Group transactions by weeks
   */
  @computed
  public get transactionsByDate() : TransactionPeriod[] {
    if (!this.transactions || this.transactions.length === 0) {
      return []
    }

    const transactions = this.sortedTransactions.slice()
    const periods : Array<TransactionPeriod> = [
      new TransactionPeriod(moment().add(1, 'day'), 'day', 'pages.summary.transactions.week_groups.tomorrow'),
      new TransactionPeriod(moment(), 'day', 'pages.summary.transactions.week_groups.today'),
      new TransactionPeriod(moment().subtract(1, 'day'), 'day', 'pages.summary.transactions.week_groups.yesterday'),
      new TransactionPeriod(moment(), 'week', 'pages.summary.transactions.week_groups.this_week'),
      new TransactionPeriod(moment().subtract(1, 'weeks'), 'week', 'pages.summary.transactions.week_groups.last_week')
    ]

    while(transactions.length > 0) {
      const transaction = transactions.pop()
      const date = moment(transaction.date)

      let foundPeriod = false
      for (let index = 0; index < periods.length; index++) {
        const period = periods[index];
        if (period.date.isSame(date, period.unit)) {
          period.transactions.push(transaction)
          foundPeriod = true
          break
        }
      }

      if (!foundPeriod) {
        let from = moment(date).startOf('week')
        let to = moment(date).endOf('week')
        if (!to.isSame(date, 'month')) {
          to = moment(date).endOf('month')
        } else if (!from.isSame(date, 'month')) {
          from = moment(date).startOf('month')
        }

        const period = new TransactionPeriod(from, 'week', `${from.format('Do')} - ${to.format('Do MMMM YYYY')}`)
        periods.push(period)
        period.transactions.push(transaction)
      }
    }

    return periods.filter(({ isEmpty }) => !isEmpty)
                  .sort((a, b) => (b.sortKey - a.sortKey))
  }

  @computed
  private get formattedCurrentDate() {
    return this.date.format('YYYY-MM')
  }

  @computed
  public get cacheKey() {
    return `summary/${this.formattedCurrentDate}/${this.type}`
  }

  protected toBundle() {
    const {
      categories, transactions
    } = this

    return {
      categories, transactions
    }
  }

  protected loadBundle({ categories, transactions }: any) {
    this.categories = categories
    this.transactions = transactions
  }

  @action
  public async clear() {
    this.state = "None"
  }
}