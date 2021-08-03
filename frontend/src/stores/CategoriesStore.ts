import { observable, action, flow, computed, reaction } from 'mobx'
import SubStore from './SubStore'
import { Category, TransactionCategoryKind } from '../api/graphql'
import logger from '../helpers/logger'

export default class CategoriesStore extends SubStore<any> {
  private log = logger('CategoriesStore')

  constructor(store) {
    super(store)

    reaction(() => this.categories, this.persist)
  }

  @observable
  public categories : Array<Category> = []

  public get cacheKey(): string {
    return 'categories'
  }

  protected toBundle(): object {
    const { categories } = this

    return {
      categories
    }
  }

  protected loadBundle({ categories }: any) {
    this.categories = categories
  }

  @action
  public add(category : Category) {
    this.categories.push(category)
  }

  @computed
  public get all() {
    return this.categories
  }

  @computed
  public get byType() {
    const o = {}
    o[TransactionCategoryKind.Saving] = this.savings
    o[TransactionCategoryKind.Loan] = this.loans
    o[TransactionCategoryKind.Expense] = this.expenses
    o[TransactionCategoryKind.Income] = this.income

    return o
  }

  @computed
  public get isEmpty() {
    return this.categories.length === 0
  }

  @computed
  public get expensesAndLoans() {
    return [
      ...this.expenses,
      ...this.loans
    ]
  }

  @computed
  public get expenses() {
    return this.categories.filter(({ kind }) => kind === TransactionCategoryKind.Expense || kind === TransactionCategoryKind.ExpenseOrTax || kind === TransactionCategoryKind.Tax)
  }

  @computed
  public get income() {
    return this.categories.filter((category) => category.kind === TransactionCategoryKind.Income)
  }

  @computed
  public get savings() {
    return this.categories.filter((category) => category.kind === TransactionCategoryKind.Saving)
  }

  @computed
  public get loans() {
    return this.categories.filter((category) => category.kind === TransactionCategoryKind.Loan)
  }

  @action
  public update(category : Category) {
    this.categories = this.categories.map((oldCategory) => {
      if (oldCategory.id === category.id) {
        return category
      } else {
        return oldCategory
      }
    })
  }

  public find(categoryId : string) {
    return this.categories.find(({ id }) => id === categoryId)
  }

  public ensureExists = flow(function * (this : CategoriesStore) {
    yield this.restore()

    if (this.isEmpty) {
      yield this.fetchAll()
    }
  }.bind(this))

  /**
   * Fetch categories from server
   */
  public refresh = flow(function * (this : CategoriesStore) {
    yield this.restore()

    if (this.categories) {
      this.log('Refreshing categories in background')
      this.fetchAll()
    } else {
      this.log('Refreshing categories')
      this.categories = []
      yield this.fetchAll()
    }
  }.bind(this))

  public fetchAll = flow(function * (this : CategoriesStore) {
    this.state = this.categories.length > 0 ? 'Refreshing' : 'Loading'

    try {
      this.categories = yield this.api.categories.getAllCategories()
    } catch(e) {
      this.root.ui.notifications.show({
        message: e,
        retryAction: this.fetchAll
      })
    }
    this.state = "Ready"
  }.bind(this))

  @action public async clear() {
    this.categories = []
    this.state = "None"
  }
}