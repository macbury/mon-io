import { action, observable, computed } from 'mobx'
import { Currency } from '../../api/graphql'
import { NonPersistableStore } from '../SubStore'

export default class CurrencyPickerDialogStore extends NonPersistableStore {
  private callback : (result : Currency | null) => void
  @observable
  public visible : boolean = false
  @observable
  public selected : Currency

  @action
  public show = (selectedCurrency : Currency) => {
    this.visible = true
    this.selected = selectedCurrency

    return new Promise<Currency>((resolve) => {
      this.callback = resolve
    })
  }

  @computed
  public get usedCurrencies() {
    return this.root.settings.usedCurrencies
  }

  @computed
  public get currencies() {
    return this.root.settings.currencies
  }

  @action
  private respondWith = (result : Currency | null) => {
    this.visible = false
    this.callback(result)
    this.callback = null
  }

  @action
  public success = (result : Currency) => {
    this.respondWith(result)
  }

  @action
  public cancel = () => {
    this.respondWith(null)
  }

  @action
  public async clear() {
    this.callback = null
    this.visible = false
  }
}