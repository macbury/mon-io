import { action, flow, observable } from 'mobx'
import SubStore from '../SubStore'

export default class SidebarStore extends SubStore<any> {
  @observable
  public collapsed : boolean = true

  @action.bound
  public toggle() {
    this.collapsed = !this.collapsed
    this.persist()
  }

  @action.bound
  public clear() {
    this.collapsed = true
  }

  get cacheKey(): string {
    return 'sidebar'
  }

  protected toBundle() {
    const {
      collapsed
    } = this

    return {
      collapsed
    }
  }

  protected loadBundle({ collapsed }): void {
    this.collapsed = collapsed
  }
}