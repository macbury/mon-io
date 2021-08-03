import { CategorySummary } from './../../../api/graphql';
import { category } from './../../../test/factories/category';
import { action, flow, observable, computed, runInAction } from 'mobx'
import moment, { Moment } from 'moment-timezone'
import bind from 'bind-decorator'
import { NonPersistableStore } from '../../SubStore'
import Budget from './Budget'

function dateToMoment(date : string | Moment) {
  return date === 'today' ? moment() : moment(date as any)
}

export default class BudgetStore extends NonPersistableStore {
  @observable
  private data : { [key : string]: Budget } = {}
  @observable
  public currentDate : Moment = moment()

  @computed
  public get current() {
    return this.data[this.id]
  }

  @computed
  public get id() {
    return this.currentDate?.format('YYYY-MM')
  }

  public update = flow(function * (this : BudgetStore) {
    yield this.current?.refresh()
  }.bind(this))


  public refresh = flow(function * (this : BudgetStore) {
    yield this.changeDate('today')
  }.bind(this))

  /**
   * Fetch budget from cache or from server
   */
  @action.bound
  public async fetch(date : string | Moment) {
    const currentDate = dateToMoment(date)
    const id = currentDate.format('YYYY-MM')

    let budget = this.data[id]
    if (!budget) {
      budget = new Budget(this.root, date)
      runInAction(() => {
        this.data[id] = budget
      })
    }

    await budget.refresh()
    return budget
  }

  /**
   * Change date
   */
  public changeDate = flow(function * (this : BudgetStore, date : Moment | string) {
    this.currentDate = dateToMoment(date)
    const id = this.currentDate.format('YYYY-MM')

    if (!this.data[id]) {
      this.state = "Loading"
      this.data[id] = new Budget(this.root, date)
    } else {
      this.state = "Refreshing"
    }

    yield this.data[id].refresh()
    this.state = "Ready"
  }.bind(this))

  /**
   * Fetch planned categories from last month and overwrite them for current one
   */
  public copyLastMonth = flow(function * (this : BudgetStore) {
    if (!(yield this.ui.confirm.show('pages.budget.copy_last_month.confirm.title', 'pages.budget.copy_last_month.confirm.message'))) {
      return
    }

    this.ui.progressDialog.show('pages.budget.copy_last_month.progress')
    
    const lastMonth = moment(this.currentDate).subtract(1, 'month')
    const lastBudget = new Budget(this.root, lastMonth)
    yield lastBudget.fetch()

    for (let index = 0; index < lastBudget.categoryOptions.length; index++) {
      const categoryOption = lastBudget.categoryOptions[index];
      
      yield this.api.budget.updateCategoryBudget({
        budgetPeriodId: this.current.id,
        planned: categoryOption.planned.cents,
        plannedCurrency: categoryOption.planned.currency.isoCode,
        categoryId: categoryOption.category.id,
        kind: categoryOption.kind
      })
    }

    yield this.current.fetch()
    this.ui.progressDialog.close()
  }.bind(this))

  /**
   * Only copy missing categories in current budget
   */
  public copyMissingFromLastMonth = flow(function * (this : BudgetStore) {
    if (!(yield this.ui.confirm.show('pages.budget.copy_missing_last_month.confirm.title', 'pages.budget.copy_missing_last_month.confirm.message'))) {
      return
    }

    this.ui.progressDialog.show('pages.budget.copy_missing_last_month.progress')

    const lastMonth = moment(this.currentDate).subtract(1, 'month')
    const lastBudget = new Budget(this.root, lastMonth)
    yield lastBudget.fetch()

    for (let index = 0; index < this.current.missingCategories.length; index++) {
      const { id: categoryId, kind } = this.current.missingCategories[index]
      const summary = lastBudget.findSummary(categoryId, kind)

      yield this.api.budget.updateCategoryBudget({
        budgetPeriodId: this.current.id,
        planned: summary.planned.cents,
        plannedCurrency: summary.planned.currency.isoCode,
        categoryId: summary.category.id,
        kind: summary.kind
      })
    }

    yield this.current.fetch()
    this.ui.progressDialog.close()
  }.bind(this))

  /**
   * Cleanup budget to empty state ready for edition
   */
  public clearBudget = flow(function * (this : BudgetStore) {
    if (!(yield this.ui.confirm.show('pages.budget.clear_budget.confirm.title', 'pages.budget.clear_budget.confirm.message'))) {
      return
    }

    this.ui.progressDialog.show('pages.budget.clear_budget.progress')

    for (let index = 0; index < this.current.categoryOptions.length; index++) {
      const { 
        id: categoryId, 
        kind, 
        planned: { 
          currency: { 
            isoCode: plannedCurrency 
          } 
        } 
      } = this.current.categoryOptions[index]

      yield this.api.budget.updateCategoryBudget({
        budgetPeriodId: this.current.id,
        planned: 0,
        plannedCurrency,
        categoryId,
        kind
      })
    }

    yield this.current.fetch()
    this.ui.progressDialog.close()
  }.bind(this))
  
  /**
   * Get forecast based on average spending for last 3 months for each entry
   */
  public forecastBudget = flow(function * (this : BudgetStore) {
    if (!(yield this.ui.confirm.show('pages.budget.forecast.confirm.title', 'pages.budget.forecast.confirm.message'))) {
      return
    }

    this.ui.progressDialog.show('pages.budget.forecast.progress')

    const forecast : CategorySummary[] = yield this.api.budget.nextMonth(this.currentDate)
    //TODO: I don't have support for kind in summaries...
    for (let index = 0; index < forecast.length; index++) {
      const {
        category: { id: categoryId, kind },
        amount: {
          amount: planned,
          currency: { isoCode: plannedCurrency }
        }
      } = forecast[index]

      yield this.api.budget.updateCategoryBudget({
        budgetPeriodId: this.current.id,
        plannedCurrency,
        planned,
        categoryId,
        kind
      })
    }

    yield this.current.fetch()
    this.ui.progressDialog.close()
  }.bind(this))

  @action.bound
  public async clear() {
    this.data = {}
  }
}