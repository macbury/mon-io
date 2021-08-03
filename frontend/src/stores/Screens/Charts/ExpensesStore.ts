import { flow, observable, computed, action } from 'mobx'
import moment from 'moment-timezone'
import SubStore from '../../SubStore'
import { TransactionCategoryKind, Summary, Category } from '../../../api/graphql'

export default class ExpensesChartStore extends SubStore<any> {
  @observable
  public categories : Category[] = []
  @observable
  private summaries : Summary[] = []
  @observable
  public selectedCategoriesIds : { [id:string]: boolean } = {}

  constructor(root) {
    super(root)
    this.state = 'Loading'
  }

  @action
  public toggle = (categoryId : string) => {
    this.selectedCategoriesIds[categoryId] = !this.selectedCategoriesIds[categoryId]
  }

  @action
  public selectOnly = (categoryId : string) => {
    this.selectedCategoriesIds = {}
    this.selectedCategoriesIds[categoryId] = true
  }

  @computed
  private get categoriesByDate() {
    const data = {}

    this.summaries.forEach(({ categories, date }) => {
      categories.forEach(({ category: { id, color }, amount }) => {
        data[id] = data[id] || []
        data[id].push({ amount: Math.abs(amount.cents), date, color })
      })
    })

    return data
  }

  @computed
  public get chartData() {
    const data = []
    Object.keys(this.categoriesByDate).forEach((categoryId) => {
      if (this.selectedCategoriesIds[categoryId]) {
        const values = this.categoriesByDate[categoryId].map(({ amount, date, color }) => ({ x: date, y: amount, color }))
        data.push(values)
      }
    })
    return data
  }

  public fetch = flow(function* (this: ExpensesChartStore, months : number) {
    this.state = this.summaries.length > 0 ? 'Refreshing' : 'Loading'

    try {
      const queries = []
      for (let month = months - 1; month >= 0; month--) {
        queries.push(
          this.api.summary.fetch(`${month} month ago`, TransactionCategoryKind.ExpenseOrTax)
        )
      }

      this.summaries = yield Promise.all(queries)
      if (this.categories.length === 0) {
        this.categories = this.summaries[0]?.categories.map(({ category }) => category) || []
        this.categories.forEach(({ id }) => {
          this.selectedCategoriesIds[id] = true
        })
      }
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
  }

  public get cacheKey(): string {
    return "ChartExpenses"
  }

  protected toBundle() {
    const {
      categories,
      summaries
    } = this

    return {
      categories,
      summaries
    }
  }

  protected loadBundle({ categories, summaries }): void {
    this.summaries = summaries
    this.categories = categories
  }
}