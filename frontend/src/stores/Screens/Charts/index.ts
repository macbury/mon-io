import { observable, action } from 'mobx'
import { NonPersistableStore } from '../../SubStore'
import ExpensesStore from './ExpensesStore'
import IncomeExpenseStore from './IncomeExpenseStore'
import LoansChartStore from './LoansStore'
import SavingsChartStore from './SavingsStore'

export default class ChartsStore extends NonPersistableStore {
  @observable
  public readonly expenses : ExpensesStore
  @observable
  public readonly ie : IncomeExpenseStore
  @observable
  public readonly loans : LoansChartStore
  @observable
  public readonly savings : SavingsChartStore

  constructor(root) {
    super(root)

    this.expenses = new ExpensesStore(root)
    this.ie = new IncomeExpenseStore(root)
    this.loans = new LoansChartStore(root)
    this.savings = new SavingsChartStore(root)
  }

  @action.bound
  public clear(): void {
    this.expenses.clear()
    this.ie.clear()
    this.loans.clear()
    this.savings.clear()
  }
}