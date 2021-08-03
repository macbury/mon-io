import { action, flow, observable, computed, reaction } from 'mobx'
import bind from 'bind-decorator'
import { Category, TransactionCategoryKind } from '../../api/graphql'
import { NonPersistableStore } from '../SubStore'

type CategoryFilter = {
  category: Category,
  selected: boolean
}

export default class CategoryFilterStore extends NonPersistableStore {
  @observable
  public options : CategoryFilter[]
  @observable
  private kinds : TransactionCategoryKind[]

  constructor(root, onChange : () => void, kinds: TransactionCategoryKind[]) {
    super(root)
    if (onChange) {
      reaction(() => this.selectedCategoriesIds, onChange)
    }
    this.kinds = kinds
  }

  @bind
  private onlyKinds(category : Category) {
    return this.kinds.length === 0 ? true : this.kinds.includes(category.kind)
  }

  public refresh = flow(function * (this : CategoryFilterStore) {
    if (!this.options) {
      yield this.root.categories.ensureExists()
      this.options = this.root.categories.all.filter(this.onlyKinds).map((category) => ({ category, selected: true }))
    }
  }.bind(this))

  @action.bound
  public toggleCategory(categoryId: string) {
    let categoryFilter = this.options.find(({ category: { id } }) => categoryId === id)
    categoryFilter.selected = !categoryFilter.selected
  }

  @action.bound
  public selectOnlyCategory(categoryId: string) {
    this.options = this.options.map((categoryFilter) => {
      return {...categoryFilter, selected: (categoryId === categoryFilter.category.id)}
    })
  }

  @computed
  public get selectedCategoriesIds() {
    return this.options?.filter(({ selected }) => selected).map(({ category }) => category.id) || []
  }

  @action.bound
  public clear(): void {
    this.options = null
  }
}