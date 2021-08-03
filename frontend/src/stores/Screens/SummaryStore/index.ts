import { action, flow, observable, computed } from 'mobx'
import moment, { Moment } from 'moment-timezone'
import { NonPersistableStore } from '../../SubStore'
import { TransactionCategoryKind } from '../../../api/graphql'
import SummaryPeriod from './SummaryPeriod'
import logger from '../../../helpers/logger'

function genDataKey(date : Moment, type : TransactionCategoryKind) {
  return `${date.format('YYYY-MM')}-${type}`
}

export default class SummaryStore extends NonPersistableStore {
  private log = logger('SummaryStore')
  @observable
  public currentDate : Moment = moment()
  @observable
  public type : TransactionCategoryKind = TransactionCategoryKind.Expense
  @observable
  private data: {
    [key : string]: SummaryPeriod
  } = {}
  @observable
  public period : SummaryPeriod

  /**
   * Fetch categories from server
   */
  public refresh = flow(function * (this : SummaryStore) {
    this.log('Refreshing summary')
    yield this.changeDate('today', TransactionCategoryKind.ExpenseOrTax)
  })

  /**
   * Get Transaction from current loaded store or fetch it from the server
   * @return [Transaction]
   */
  public find = flow(function * (this : SummaryStore, transactionId : string) {
    let transaction = this.transactions.find(({ id }) => id === transactionId)

    if (transaction) {
      return { ...transaction }
    } else {
      return yield this.api.transactions.find(transactionId)
    }
  }.bind(this))

  /**
   * Switch date, and refresh data to match that date
   */
  public changeDate = flow(function * (this : SummaryStore, date : String | 'today', type : TransactionCategoryKind) {
    let currentDate = date === 'today' ? moment() : moment(date as any)
    if (currentDate.isSame(moment(), 'month')) {
      currentDate = moment()
    }

    currentDate = currentDate.startOf('month')

    const dataKey = genDataKey(currentDate, type)

    this.currentDate = currentDate
    this.type = type

    if (!this.data[dataKey]) {
      this.period = new SummaryPeriod(this.root, currentDate, type)
      this.data[dataKey] = this.period
    } else {
      this.period = this.data[dataKey]
    }

    yield this.refreshCurrentDate()
  }.bind(this))

  public refreshCurrentDate = flow(function * (this : SummaryStore) {
    if (!this.period) {
      return null
    }

    this.state = this.period?.isEmpty ? "Loading" : "Refreshing"

    try {
      yield this.period.refresh()
    } catch (e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: this.refreshCurrentDate
      })
    }

    this.state = "Ready"
  }.bind(this))

  public delete = flow(function * (this : SummaryStore, transactionId : string) {
    const success = yield this.root.ui.confirm.show(
      'dialogs.transactions.delete.title',
      'dialogs.transactions.delete.message'
    )

    if (success) {
      yield this.api.transactions.destroy(transactionId)
      yield this.refreshCurrentDate()
      yield this.screens.transactions.remove(transactionId)
      this.root.ui.notifications.showSuccess('success.transactions.destroy')
    }

    return success
  }.bind(this))

  @computed
  public get categories() {
    if (this.period) {
      return this.period.categories || []
    } else {
      return []
    }
  }

  @computed
  public get transactions() {
    if (this.period) {
      return this.period.transactions || []
    } else {
      return []
    }
  }

  @computed
  public get transactionsByDate() {
    if (this.period) {
      return this.period.transactionsByDate || []
    } else {
      return []
    }
  }

  @computed
  private get expensesCategories() {
    return this.categories?.filter(({ category: { kind } }) => kind === TransactionCategoryKind.Expense) || []
  }

  @computed
  public get sumOfCategoriesInCents() {
    if (this.expensesCategories && this.expensesCategories.length > 0) {
      return this.expensesCategories.map(({ amount: { cents } }) => cents).reduce((sum, value) => sum + value)
    } else {
      return 0
    }
  }

  @computed
  public get sortedCategories() {
    return this.categories ? this.categories.slice().sort((a, b) => ( a.category.name.localeCompare(b.category.name) )) : []
  }

  @action
  public async clear() {
    this.state = "None"
  }

}