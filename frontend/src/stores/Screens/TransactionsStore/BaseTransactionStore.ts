import { observable } from 'mobx'
import { NonPersistableStore } from '../../SubStore'
import { Moment } from 'moment-timezone'
import { Category, TransactionSeries, TransactionReceipt, TransactionImport } from '../../../api/graphql'

export type CategoryFilter = {
  category: Category,
  selected: boolean
}

export default abstract class BaseTransactionStore extends NonPersistableStore {
  @observable
  public importId : string
  @observable
  public query : string = ''
  @observable
  public fromDate : Moment
  @observable
  public toDate : Moment
  @observable
  public series : TransactionSeries = TransactionSeries.All
  @observable
  public receipts : TransactionReceipt = TransactionReceipt.All
  @observable
  public imported : TransactionImport = TransactionImport.All
}