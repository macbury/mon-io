import { observable, computed } from 'mobx'
import { Moment, unitOfTime } from 'moment-timezone'
import { Transaction, Money } from '../../../api/graphql'

export default class TransactionPeriod {
  @observable
  public transactions: Transaction[]
  @observable
  public date: Moment
  @observable
  public unit: unitOfTime.StartOf
  @observable
  public label: string

  constructor(date : Moment, unit : unitOfTime.StartOf, label : string) {
    this.date = date.startOf(unit)
    this.unit = unit
    this.label = label
    this.transactions = []
  }

  @computed
  public get sortKey() {
    return this.date.valueOf()
  }

  @computed
  public get isEmpty() {
    return this.transactions.length === 0
  }

  @computed
  public get length() {
    return this.transactions.length
  }

  @computed
  public get amount() : Money {
    const cents = this.transactions.map(({ exchangedAmount: { cents } }) => cents).reduce((sum, value) => sum + value)
    const currency = this.transactions[0].exchangedAmount.currency

    return {
      cents,
      currency
    }
  }
}