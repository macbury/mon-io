import { action, flow, observable, computed } from 'mobx'
import bind from 'bind-decorator'

import { Currency, TransactionCategoryKind, UpdateCategoryInput, CreateCategoryInput } from '../../api/graphql'
import { editCategoriesPath } from '../../helpers/urls'
import { NonPersistableStore } from '../SubStore'
import logger from '../../helpers/logger'

export default class EditCategoryStore extends NonPersistableStore {
  private log = logger('EditCategoryStore')

  @observable
  public notFound: boolean
  @observable
  public id : string
  @observable
  public system : boolean
  @observable
  public shared : boolean
  @observable
  public archived : boolean
  @observable
  public icon : string
  @observable
  public color : string
  @observable
  public name : string
  @observable
  public kind : TransactionCategoryKind
  @observable
  public currency : Currency

  public initialize = flow(function * (this : EditCategoryStore, kind: TransactionCategoryKind) {
    this.clear()
    this.system = false
    this.currency = null
    this.kind = kind
    this.color = '#FBC02D'
    this.icon = 'MaterialCommunityIcons:piggy-bank'
  }.bind(this))

  public load = flow(function * (this : EditCategoryStore, categoryId: string) {
    this.log('Loading category', categoryId)
    this.clear()
    this.state = "Loading"

    yield this.root.categories.ensureExists()
    const category = this.root.categories.find(categoryId)

    if (category) {
      this.id = category.id
      this.system = category.system
      this.shared = category.shared
      this.icon = category.icon
      this.color = category.color
      this.name = category.name
      this.kind = category.kind
      this.currency = category.currency
      this.archived = category.archived
    } else {
      this.notFound = true
    }

    this.state = "Ready"
  }.bind(this))

  public save = flow(function * (this : EditCategoryStore) {
    try {
      this.state = "Saving"

      if (this.isNewRecord) {
        return yield this.create()
      } else {
        return yield this.update()
      }
    } finally {
      this.state = "Ready"
    }
  }.bind(this))

  private create = flow(function * (this : EditCategoryStore) {
    const { category, errors } = yield this.api.categories.create(this.createAttributes)

    if (errors?.length > 0) {
      yield this.ui.notifications.showErrors(errors, () => this.save())

      return false
    } else {
      yield this.root.categories.fetchAll()
      this.root.ui.notifications.editAction('success.category.created', editCategoriesPath(category.id))
      return true
    }
  }.bind(this))

  private update = flow(function * (this : EditCategoryStore) {
    const { category, errors } = yield this.api.categories.update(this.updateAttributes)

    if (errors?.length > 0) {
      yield this.ui.notifications.showErrors(errors, () => this.save())

      return false
    } else {
      yield this.root.categories.fetchAll()
      this.root.ui.notifications.editAction('success.category.updated', editCategoriesPath(category.id))
      return true
    }
  }.bind(this))

  @computed
  public get isNewRecord() {
    return this.id === null
  }

  @computed
  private get updateAttributes() : UpdateCategoryInput{
    const {
      id, shared, icon, color, name, currency, archived
    } = this

    return {
      id, shared: shared || false, icon, color, name, currency: currency?.isoCode, archived
    }
  }

  @computed
  private get createAttributes() : CreateCategoryInput {
    const {
      shared, icon, color, name, kind, currency
    } = this

    return {
      shared, icon, color, name, kind, currency: currency?.isoCode
    }
  }

  @bind
  @action
  public setShared(shared : boolean) {
    this.shared = shared
  }

  @bind
  @action
  public setArchived(archived : boolean) {
    this.archived = archived
  }

  @bind
  @action
  public setName(newName : string) {
    this.name = newName
  }

  public pickCurrency = flow(function * (this: EditCategoryStore) {
    this.currency = yield this.ui.currencyPicker.show(this.currency || this.root.settings.mainCurrency)
  }.bind(this))

  public pickIcon = flow(function * (this: EditCategoryStore) {
    const icon = yield this.ui.iconDialog.show({
      name: this.icon.split(':')[1],
      color: this.color
    })

    if (icon) {
      this.icon = `MaterialCommunityIcons:${icon.name}`
      this.color = icon.color
    }
  }.bind(this))

  @computed
  public get disabled() {
    return this.system
  }

  @bind
  @action
  public async clear() {
    this.id = null
    this.archived = false
    this.system = null
    this.shared = null
    this.icon = null
    this.color = null
    this.name = null
    this.notFound = false
    this.currency = null
    this.kind = null
  }
}