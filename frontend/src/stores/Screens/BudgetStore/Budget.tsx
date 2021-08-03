import moment, { Moment } from 'moment-timezone'
import bind from 'bind-decorator'
import { observable, computed, flow, action } from 'mobx'

import SubStore from '../../SubStore'
import { BudgetPeriod, CategoryBudget, TransactionCategoryKind } from '../../../api/graphql'
import logger from '../../../helpers/logger'
import {
  onlyExpenses,
  onlyIncome,
  onlyLoans,
  onlyDeposit,
  onlyWithdraw,
  onlySpending,
  onlyPlanned,
  onlySavings,
  onlyExpensesAndRest,
  sumMoney,
  subMoney
} from './filters'

export class BudgetOption {
  @observable
  public categoryBudget : CategoryBudget
  @observable
  private allSharedCategories : CategoryBudget[]

  constructor(categoryBudget : CategoryBudget, allSharedCategories : CategoryBudget[]) {
    this.categoryBudget = categoryBudget
    this.allSharedCategories = allSharedCategories
  }

  @computed
  private get sharedCategoryBudget() {
    if (!this.shared) {
      return []
    }

    return this.allSharedCategories.filter(({ category: { id } }) => (id == this.id))
  }

  @computed
  public get all() {
    return [
      this.categoryBudget,
      ...this.sharedCategoryBudget
    ]
  }

  @computed
  public get shared() {
    return this.category.shared
  }

  @computed
  public get totalSpending() {
    return [this.othersSpending, this.categoryBudget.exchangedSpend].reduce(sumMoney, {
      cents: 0,
      currency: this.category.currency
    })
  }

  @computed
  public get totalPlanned() {
    return [this.othersPlanned, this.categoryBudget.exchangedPlanned].reduce(sumMoney, {
      cents: 0,
      currency: this.category.currency
    })
  }

  @computed
  public get othersSpending() {
    return this.sharedCategoryBudget.map(({ exchangedSpend }) => exchangedSpend).reduce(sumMoney, {
      cents: 0,
      currency: this.category.currency
    })
  }

  @computed
  public get othersPlanned() {
    return this.sharedCategoryBudget.map(({ exchangedPlanned }) => exchangedPlanned).reduce(sumMoney, {
      cents: 0,
      currency: this.category.currency
    })
  }

  @computed
  public get othersExecuted() {
    return this.othersSpending.cents / this.totalPlanned.cents
  }

  @computed
  public get myExecuted() {
    return this.categoryBudget.exchangedSpend.cents / this.totalPlanned.cents
  }

  @computed
  public get available() {
    return this.sharedCategoryBudget.map(({ available }) => available).reduce(sumMoney, this.categoryBudget.available)
  }

  @computed
  public get category() {
    return this.categoryBudget.category
  }

  @computed
  public get id() {
    return this.category.id
  }

  @computed
  public get kind() {
    return this.category.kind
  }

  @action
  public clear(): void {

  }
}

export default class Budget extends SubStore<any> {
  private readonly log = logger('Budget')
  @observable
  public date : Moment
  @observable
  private period : BudgetPeriod

  constructor(root : any, date : Moment | string) {
    super(root)

    let currentDate = date === 'today' ? moment() : moment(date as any)
    if (currentDate.isSame(moment(), 'month')) {
      currentDate = moment()
    }

    currentDate = currentDate.startOf('month')
    this.date = currentDate
    this.restore()
  }

  @computed
  public get prevMonth() {
    return moment(this.date).subtract(1, 'month')
  }

  @computed
  public get id() {
    return this.date.format('YYYY-MM-01')
  }

  @computed
  public get totalSpend() {
    if (!this.period) {
      return this.buildZeroAmount()
    }

    return [
      ...this.period.categories,
      ...this.period.missingCategories
    ].filter(onlySpending).map(({ exchangedSpend }) => exchangedSpend).reduce(sumMoney, this.buildZeroAmount())
  }

  /**
   * Amount that is not in the budget
   * (income + withdraws) - (expense + tax + loans + deposits)
   */
  @computed
  public get notBudgeted() {
    if (!this.period) {
      return this.buildZeroAmount()
    }

    const expensesAndRest = this.period.categories.filter(onlyExpensesAndRest).map(({ exchangedPlanned }) => exchangedPlanned).reduce(sumMoney, this.buildZeroAmount())

    const incomeAndWithdraws = this.period.categories.filter(onlyPlanned).map(({ exchangedPlanned }) => exchangedPlanned).reduce(sumMoney, this.buildZeroAmount())

    return subMoney(incomeAndWithdraws, expensesAndRest)
  }

  @computed
  public get left() {
    return subMoney(this.totalPlanned, this.totalSpend)
  }

  @computed
  public get missing() {
    if (!this.period) {
      return this.buildZeroAmount()
    }

    return this.period.missingCategories.map(({ exchangedSpend }) => exchangedSpend).reduce(sumMoney, this.buildZeroAmount())
  }

  @computed
  public get totalPlanned() {
    if (!this.period) {
      return this.buildZeroAmount()
    }

    return this.period.categories.filter(onlyPlanned).map(({ exchangedPlanned }) => exchangedPlanned).reduce(sumMoney, this.buildZeroAmount())
  }

  private buildZeroAmount() {
    return {
      cents: 0,
      currency: this.root.settings.mainCurrency
    }
  }

  @bind
  public findSummary(categoryId : string, findKind : TransactionCategoryKind) {
    return this.categoryOptions.find(({ id, kind }) => categoryId === id && kind === findKind)
  }

  public refresh = flow(function * (this : Budget) {
    yield this.restore()

    if (this.isLoading) {
      return
    }

    if (this.period) {
      this.log('Period already loaded, refreshing in background')
      this.fetch()
    } else {
      this.log('Period is empty, waiting for refresh from server')
      yield this.fetch()
    }
  }.bind(this))

  public fetch = flow(function * (this : Budget) {
    this.state = this.period ? "Refreshing" : "Loading"

    try {
      this.period = yield this.api.budget.fetch(this.id)
      yield this.persist()
    } catch (e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: this.refresh
      })
    }

    this.state = "Ready"
  })

  @computed
  public get categories() {
    return this.period?.categories || []
  }

  @computed
  public get missingCategories() {
    return this.period?.missingCategories || []
  }

  @computed
  public get categoryOptions() {
    return [
      ...(this.period?.missingCategories || []),
      ...(this.period?.categories || [])
    ]
  }

  @computed
  public get allIncomes() {
    return this.categoryOptions.filter(onlyIncome)
  }

  @computed
  public get allDeposits() {
    return this.categoryOptions.filter(onlyDeposit)
  }

  @computed
  public get allWithdraws() {
    return this.categoryOptions.filter(onlyWithdraw)
  }

  @computed
  public get allLoans() {
    return this.categoryOptions.filter(onlyLoans)
  }

  @computed
  public get allExpenses() {
    return this.categoryOptions.filter(onlyExpenses)
  }

  @computed
  public get balance() {
    return this.period?.balance
  }

  @computed
  public get loansMissingCategories() {
    return this.period?.missingCategories?.filter(onlyLoans) || []
  }

  @computed
  public get depositMissingCategories() {
    return this.period?.missingCategories?.filter(onlyDeposit) || []
  }

  @computed
  public get withdrawMissingCategories() {
    return this.period?.missingCategories?.filter(onlyWithdraw) || []
  }

  @computed
  public get incomeMissingCategories() {
    return this.period?.missingCategories?.filter(onlyIncome) || []
  }

  @computed
  public get expensesMissingCategories() {
    return this.period?.missingCategories?.filter(onlyExpenses) || []
  }

  @computed
  public get incomeBudgetCategories() {
    return (this.period?.categories?.filter(onlyIncome) || []).map(this.buildBudgetOption)
  }

  @computed
  public get loansBudgetCategories() {
    return (this.period?.categories?.filter(onlyLoans) || []).map(this.buildBudgetOption)
  }

  @computed
  public get expensesBudgetCategories() {
    return (this.period?.categories?.filter(onlyExpenses) || []).map(this.buildBudgetOption)
  }

  @computed
  public get withdrawBudgetCategories() {
    return (this.period?.categories?.filter(onlyWithdraw) || []).map(this.buildBudgetOption)
  }

  @computed
  public get depositBudgetCategories() {
    return (this.period?.categories?.filter(onlyDeposit) || []).map(this.buildBudgetOption)
  }

  @computed
  public get currentDateParamKey() {
    return this.date.format('YYYY-MM')
  }

  @bind
  private buildBudgetOption(categoryBudget : CategoryBudget) {
    return new BudgetOption(categoryBudget, this.period.sharedCategories || [])
  }

  @action
  public async clear() {
    this.date = null
    this.period = null
  }

  public get cacheKey() {
    return ['budget', 'period', this.id].join('/')
  }

  protected toBundle() {
    const { period } = this

    return {
      period
    }
  }

  protected loadBundle(bundle: any) {
    const { period } = bundle
    this.period = period
  }
}