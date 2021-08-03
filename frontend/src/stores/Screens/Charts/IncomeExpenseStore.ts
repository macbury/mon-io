import { flow, observable, computed, action } from 'mobx'
import moment from 'moment-timezone'
import SubStore from '../../SubStore'
import { Summary, TransactionCategoryKind } from '../../../api/graphql'

export default class IncomeExpenseChartStore extends SubStore<any> {
  @observable
  public summaries : Summary[] = []
  @observable
  public filters : {
    [key : string]: boolean
  }

  constructor(root) {
    super(root)
    this.state = 'Loading'
    this.filters = {}
    this.filters[TransactionCategoryKind.Expense] =
     this.filters[TransactionCategoryKind.Income] =
     this.filters[TransactionCategoryKind.Saving] = true
  }

  @action.bound
  public toggle(kind : TransactionCategoryKind) {
    this.filters[kind] = !this.filters[kind]
  }

  @action.bound
  public setOnly(kind : TransactionCategoryKind) {
    this.filters = {}
    this.filters[kind] = true
  }

  @computed
  public get labels() : string[] {
    const currentYear = moment().year()
    return this.summaries.map(({ date }) => {
      const d = moment(date).tz(this.root.settings.timezoneName)
      if (d.year() === currentYear) {
        return d.format('MMM')
      } else {
        return d.format('MMM YYYY')
      }
    })
  }

  @computed
  public get incomes() {
    return this.summaries.map(({ income, date }) => ({ y: Math.abs(income.cents), x: date }))
  }

  @computed
  public get expenses() {
    return this.summaries.map(({ expense, date }) => ({ y: Math.abs(expense.cents), x: date }))
  }

  @computed
  public get differences() {
    return this.summaries.map(({ difference, date }) => ({ y: Math.max(difference.cents, 0), x: date }))
  }

  public fetch = flow(function* (this: IncomeExpenseChartStore, months : number) {
    this.state = this.summaries.length > 0 ? 'Refreshing' : 'Loading'
    try {
      const queries = []
      for (let month = months - 1; month >= 0; month--) {
        queries.push(
          this.api.summary.incomeExpense(`${month} month ago`)
        )
      }

      const summaries = yield Promise.all(queries)
      this.summaries = summaries
      yield this.persist()
    } catch (e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: () => this.fetch(months)
      })
    }
    this.state = 'Ready'
  }.bind(this))

  @action
  public clear(): void {
    this.summaries = []
  }

  public get cacheKey(): string {
    return 'IncomeExpenseChart'
  }

  public toBundle() {
    const {
      summaries
    } = this

    return {
      summaries
    }
  }

  @action
  protected loadBundle({ summaries } : any): void {
    this.summaries = summaries || []
  }
}