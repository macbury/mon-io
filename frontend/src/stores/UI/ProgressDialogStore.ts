import { action, observable } from 'mobx'
import { NonPersistableStore } from '../SubStore'

export default class ProgressDialogStore extends NonPersistableStore {
  @observable
  public visible : boolean = false
  @observable
  public titleKey : string = 'Please wait...'

  @action.bound
  public show(titleKey : string) {
    this.titleKey = titleKey
    this.visible = true
  }

  @action.bound
  public close() {
    this.visible = false
  }

  @action.bound
  public async clear() {
    this.visible = false
    this.titleKey = ''
  }
}