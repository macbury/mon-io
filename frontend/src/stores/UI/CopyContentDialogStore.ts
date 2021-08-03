import { action, observable } from 'mobx'
import { NonPersistableStore } from '../SubStore'

export default class CopyContentDialogStore extends NonPersistableStore {
  @observable
  public visible : boolean = false
  @observable
  public titleKey : string
  @observable
  public messageKey : string
  @observable
  public content : string

  @action.bound
  public show(titleKey : string, messageKey : string, content : string) {
    this.titleKey = titleKey
    this.messageKey = messageKey
    this.content = content
    this.visible = true
  }

  @action.bound
  public close() {
    this.visible = false
    this.clear()
  }

  @action
  public async clear() {
    this.visible = false
    this.titleKey = ''
    this.messageKey = ''
    this.content = ''
  }
}