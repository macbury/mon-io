import { action, observable, computed } from 'mobx'
import { NonPersistableStore } from '../SubStore'

export type TOption = {
  title: string
  icon: string
  onPress()
}

export default class MenuActionStore extends NonPersistableStore {
  @observable
  public items: TOption[]
  @observable
  public titleKey: string

  @computed
  public get visible() {
    return this.items != null
  }

  @action.bound
  public cancel() {
    this.clear()
  }

  @action.bound
  public show(titleKey : string, options : TOption[]) {
    this.items = options
    this.titleKey = titleKey
  }

  @action.bound clear() {
    this.items = null
  }
}