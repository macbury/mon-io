import { action, observable } from 'mobx'
import { NonPersistableStore } from '../SubStore'

export default class ConfirmDialogStore extends NonPersistableStore {
  private callback : (result : boolean) => void
  @observable
  public visible : boolean = false
  @observable
  public titleKey : string
  @observable
  public messageKey : string

  @action.bound
  public show(titleKey : string, messageKey : string) {
    this.titleKey = titleKey
    this.messageKey = messageKey
    this.visible = true

    return new Promise<boolean>((resolve) => {
      this.callback = resolve
    })
  }

  @action.bound
  public respondWith(result : boolean) {
    this.visible = false
    this.callback(result)
    this.callback = null
  }

  @action
  public async clear() {
    this.callback = null
    this.visible = false
    this.titleKey = ''
    this.messageKey = ''
  }
}