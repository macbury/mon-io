import { action, observable, computed } from 'mobx'
import bind from 'bind-decorator'
import { NonPersistableStore } from '../SubStore'

export type TIcon = {
  color: string
  name: string
}

export default class IconDialogStore extends NonPersistableStore {
  private callback : (icon : TIcon) => void
  @observable
  public visible : boolean = false
  @observable
  public name : string
  @observable
  public color : string

  @bind
  @action
  public setIcon(newIcon : string) {
    this.name = newIcon
  }

  @bind
  @action
  public setColor(newColor : string) {
    this.color = newColor
  }

  @bind
  @action
  public show(icon: TIcon) {
    this.name = icon?.name
    this.color = icon?.color
    this.visible = true

    return new Promise<TIcon>((resolve) => {
      this.callback = resolve
    })
  }

  @bind
  @action
  public ok() {
    this.visible = false
    this.callback({
      name: this.name,
      color: this.color
    })
    this.callback = null
  }

  @bind
  @action
  public cancel() {
    this.visible = false
    if (this.callback) {
      this.callback(null)
      this.callback = null
    }
  }

  @bind
  @action
  public async clear() {
    this.callback = null
    this.visible = false
    this.name = this.color = null
  }
}