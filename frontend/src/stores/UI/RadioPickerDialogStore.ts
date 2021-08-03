import { action, observable, flow } from 'mobx'
import bind from 'bind-decorator'
import { NonPersistableStore } from '../SubStore'
import logger from '../../helpers/logger'

export type RadioOption = {
  title: string
  value: any
}

export default class RadioPickerDialogStore extends NonPersistableStore {
  private log = logger('RadioPickerDialogStore')
  private callback : (value : any) => void
  @observable
  public current : any
  @observable
  public options : RadioOption[] = []
  @observable
  public title : string
  @observable
  public visible : boolean = false

  @bind
  @action
  public show(title: string, current: any, options: RadioOption[]) {
    this.visible = true
    this.title = title
    this.options = options
    this.current = current

    return new Promise<RadioOption>((resolve) => {
      this.callback = resolve
    })
  }

  @bind
  @action
  public respondWith(option : RadioOption) {
    this.callback(option ? option.value : null)
    this.callback = null

    this.visible = false
  }

  @bind
  @action
  public async clear() {
    this.current = null
    this.callback = null
    this.visible = false
  }
}