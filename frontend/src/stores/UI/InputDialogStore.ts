import { action, observable, flow } from 'mobx'
import { NonPersistableStore } from '../SubStore'

type TCallback = (value : string) => void

export default class InputDialogStore extends NonPersistableStore {
  private callback : TCallback
  @observable
  public visible : boolean = false
  @observable
  public titleKey : string = '...'
  @observable
  public value: string

  @action.bound
  public setValue(val : string) {
    this.value = val
  }

  @action.bound
  public show(titleKey : string, value : string) : Promise<string> {
    this.clear()
    this.titleKey = titleKey
    this.value = value
    this.visible = true

    return new Promise<string>((resolve) => {
      this.callback = resolve
    })
  }

  @action.bound
  public ok() {
    this.visible = false
    this.callback(this.value)
    this.clear()
  }

  @action.bound
  public dismiss() {
    this.visible = false
    this.callback(null)
    this.clear()
  }

  @action.bound
  public async clear() {
    this.visible = false
    this.titleKey = ''
    this.value = ''
    this.callback = null
  }
}