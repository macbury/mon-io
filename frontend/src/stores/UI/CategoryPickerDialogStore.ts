import { action, observable, computed } from 'mobx'
import { Category, TransactionCategoryKind } from '../../api/graphql'
import { NonPersistableStore } from '../SubStore'

export enum CategoryPickerDialogMode {
  Category,
  CategoryAndKind
}

export type CategoryResult = {
  category : Category
  kind: TransactionCategoryKind
}

export default class CategoryPickerDialogStore extends NonPersistableStore {
  private callback : (result: CategoryResult) => void
  @observable
  public visible : boolean = false
  @observable
  public tabIndex : number = 0
  @observable
  public selected : Category
  @observable
  public mode: CategoryPickerDialogMode

  @computed
  public get routes() {
    const baseTabs = [
      { key: 'expenses', title: this.i18n.t('dialogs.categories.tabs.expense') },
      { key: 'income', title: this.i18n.t('dialogs.categories.tabs.income') },
      { key: 'loans', title: this.i18n.t('dialogs.categories.tabs.loans') }
    ]
    if (this.mode === CategoryPickerDialogMode.CategoryAndKind) {
      return [
        ...baseTabs,
        { key: 'deposit', title: this.i18n.t('dialogs.categories.tabs.deposit') },
        { key: 'withdraw', title: this.i18n.t('dialogs.categories.tabs.withdraw') },
      ]
    } else {
      return [
        ...baseTabs,
        { key: 'savings', title: this.i18n.t('dialogs.categories.tabs.savings') }
      ]
    }
  }

  @action.bound
  public setTabIndex(newIndex : number) {
    this.tabIndex = newIndex
  }

  @action.bound
  public pickCategory(selectedCategory : Category) {
    this.visible = true
    this.selected = selectedCategory
    this.mode = CategoryPickerDialogMode.Category

    if (selectedCategory?.kind === TransactionCategoryKind.Loan) {
      this.tabIndex = 2
    } else if (selectedCategory?.kind === TransactionCategoryKind.Saving) {
      this.tabIndex = 3
    } else if (selectedCategory?.kind === TransactionCategoryKind.Income) {
      this.tabIndex = 1
    } else {
      this.tabIndex = 0
    }

    return new Promise<CategoryResult>((resolve) => {
      this.callback = resolve
    })
  }

  @action.bound
  public pickCategoryAndKind(selectedCategory : Category, kind: TransactionCategoryKind) {
    this.visible = true
    this.selected = selectedCategory
    this.mode = CategoryPickerDialogMode.CategoryAndKind

    if (kind === TransactionCategoryKind.Loan) {
      this.tabIndex = 2
    } else if (kind === TransactionCategoryKind.Withdraw) {
      this.tabIndex = 4
    } else if (kind === TransactionCategoryKind.Deposit) {
      this.tabIndex = 3
    } else if (kind === TransactionCategoryKind.Income) {
      this.tabIndex = 1
    } else {
      this.tabIndex = 0
    }

    return new Promise<CategoryResult>((resolve) => {
      this.callback = resolve
    })
  }

  @computed
  private get isKindExpense() {
    return this.selected?.kind === TransactionCategoryKind.Expense || this.selected?.kind === TransactionCategoryKind.ExpenseOrTax
  }

  @computed
  private get isKindIncome() {
    return this.selected?.kind === TransactionCategoryKind.Income
  }

  @computed
  private get isKindSavings() {
    return this.selected?.kind === TransactionCategoryKind.Saving
  }

  @action.bound
  private respondWith(category : Category | null, kind: TransactionCategoryKind) {
    this.visible = false
    if (this.callback) {
      this.callback({ category, kind })
    }
    this.callback = null
  }

  @action.bound
  public success(category : Category, kind: TransactionCategoryKind) {
    this.respondWith(category, kind)
  }

  @action.bound
  public cancel() {
    this.respondWith(null, null)
  }

  @action
  public async clear() {
    this.callback = null
    this.visible = false
  }
}