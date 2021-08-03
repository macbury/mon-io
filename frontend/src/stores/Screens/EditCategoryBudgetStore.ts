import { action, flow, observable, computed } from 'mobx'
import { NonPersistableStore } from '../SubStore'
import { CalculatorStore } from '../CalculatorStore'
import Budget from './BudgetStore/Budget'
import { Category, Money, CategoryBudget, CategorySummary, UpdateCategoryBudgetPayload, TransactionCategoryKind } from '../../api/graphql'

function findSummaryAmount(summary : CategorySummary[], category : Category) {
  return summary?.find((data) => (data.category.id === category?.id))?.amount
}

export default class EditCategoryBudgetStore extends NonPersistableStore {
  @observable
  public calculator : CalculatorStore
  @observable
  public kind : TransactionCategoryKind
  @observable
  public category : Category
  @observable
  public planned : Money
  @observable
  public spend : Money
  @observable
  public budget : Budget
  @observable
  public summary : CategoryBudget
  @observable
  private nextBudget : CategorySummary[]
  @observable
  private currentSummary : CategorySummary[]
  @observable
  private prevBudget : Budget

  constructor(root) {
    super(root)
    this.calculator = new CalculatorStore(root)
    this.state = "Loading"
  }

  public forecast = flow(function * (this : EditCategoryBudgetStore) {
    const [
      prevBudget,
      nextBudget,
    ] = yield Promise.all([
      this.root.screens.budget.fetch(this.budget.prevMonth),
      this.api.budget.nextMonth(this.budget.date),
    ])

    this.prevBudget = prevBudget
    this.nextBudget = nextBudget
  }.bind(this))

  public load = flow(function * (this : EditCategoryBudgetStore, budgetId: string, categoryId : string, kind: TransactionCategoryKind ) {
    this.clear()
    this.state = "Loading"

    this.budget = yield this.root.screens.budget.fetch(budgetId)
    this.summary = this.budget?.findSummary(categoryId, kind)
    this.kind = kind

    if (!this.summary) {
      this.state = "NotFound"
      return
    }

    this.currentSummary = yield this.api.summary.fetchCategoriesSummary(this.budget.id, this.summary.category.kind)

    this.category = this.summary.category
    this.planned = this.summary.planned
    this.spend = this.summary.spend

    this.calculator.setValue(this.planned)
    this.state = "Ready"
  }.bind(this))

  @action.bound
  public setAmount(amount : Money) {
    this.calculator.setValue(amount)
  }

  @action.bound
  public changeAmount(newAmount : string) {
    this.calculator.calculate()
    this.calculator.parseAmount(newAmount)
  }

  @computed
  public get nextMonthAmount() {
    return findSummaryAmount(this.nextBudget, this.category)
  }

  @computed
  public get currentMonthAmount() {
    return findSummaryAmount(this.currentSummary, this.category)
  }

  @computed
  public get prevMonthPlannedAmount() {
    return this.prevBudget?.findSummary(this.category.id, this.kind)?.planned
  }

  @computed
  public get prevMonthSpendAmount() {
    return this.prevBudget?.findSummary(this.category.id, this.kind)?.spend
  }

  @computed
  private get currency() {
    return this.summary.category.currency
  }

  public submit = flow(function * (this : EditCategoryBudgetStore) {
    if (this.calculator.hasOperation) {
      this.calculator.calculate()
      return false
    } else {
      try {
        yield this.ui.progressDialog.show('pages.edit_category.saving_overlay')
        this.state = "Saving"

        const { errors } : UpdateCategoryBudgetPayload = yield this.api.budget.updateCategoryBudget({
          budgetPeriodId: this.budget.id,
          planned: this.calculator.cents,
          plannedCurrency: this.currency.isoCode,
          categoryId: this.category.id,
          kind: this.kind
        })

        if (errors.length > 0) {
          this.state = "Ready"
          this.root.ui.notifications.show({
            message: errors.join(', ')
          })
          return false
        } else {
          this.state = "Ready"
          this.root.ui.notifications.showSuccess('success.budget.updated')
          return true
        }
      } finally {
        yield this.ui.progressDialog.close()
      }
    }
  }.bind(this))

  @computed
  public get amount() {
    return this.calculator.value
  }

  @action
  public clear() {
    this.calculator.clear()
    this.budget = null
    this.currentSummary = null
    this.summary = null
    this.prevBudget = null
    this.nextBudget = null
    this.state = "Loading"
  }
}