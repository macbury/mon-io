import { action, observable, flow } from 'mobx'
import bind from 'bind-decorator'
import { Moment } from 'moment-timezone'
import { NonPersistableStore } from '../SubStore'
import logger from '../../helpers/logger'

export default class DatePickerDialog extends NonPersistableStore {
  private log = logger('DatePickerDialog')
  private callback : (selectedDate : Moment) => void
  @observable
  public selectedDate : Moment

  @observable
  public visible : boolean = false

  @bind
  @action
  public show(selectedDate? : Moment) {
    this.selectedDate = selectedDate
    this.visible = true
    return new Promise<Moment>((resolve) => {
      this.callback = resolve
    })
  }

  @bind
  @action
  public close() {
    this.respondWith(null)
  }

  @bind
  @action
  public respondWith(selectedDate : Moment) {
    this.visible = false
    this.callback(selectedDate)
    this.callback = null
  }

  @bind
  @action
  public async clear() {
    this.callback = null
    this.visible = false
  }
}