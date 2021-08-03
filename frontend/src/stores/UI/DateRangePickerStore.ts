import { action, observable, flow } from 'mobx'
import bind from 'bind-decorator'
import { Moment } from 'moment-timezone'
import { NonPersistableStore } from '../SubStore'
import logger from '../../helpers/logger'

export default class DateRangePickerDialog extends NonPersistableStore {
  private log = logger('DateRangePickerDialog')
  private callback : (fromDate: Moment, toDate: Moment) => void
  @observable
  public fromDate : Moment
  @observable
  public toDate : Moment

  @observable
  public visible : boolean = false

  @bind
  @action
  public show(fromDate: Moment, toDate: Moment) {
    this.fromDate = fromDate
    this.toDate = toDate
    this.visible = true
    return new Promise<Moment>((resolve) => {
      this.callback = resolve
    })
  }

  @bind
  @action
  public close() {
    this.visible = false
    this.clear()
  }

  @bind
  @action
  public ok() {
    this.visible = false
    this.callback(this.fromDate, this.toDate)
    this.clear()
  }

  @bind
  @action
  public async clear() {
    this.callback = null
    this.fromDate = null
    this.toDate = null
    this.visible = false
  }
}