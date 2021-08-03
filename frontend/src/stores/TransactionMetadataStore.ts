import { action, flow, computed, observable } from 'mobx'
import BaseTransactionFormStore from './BaseTransactionFormStore'
import { NonPersistableStore } from './SubStore'

export type TMetadataPill = {
  title: string
  text: string
  preview?: string
  icon: string
  present: boolean
  onEdit()
  onDelete()
}

export default class TransactionMetadataStore extends NonPersistableStore {
  @observable
  private transactionStore: BaseTransactionFormStore
  
  constructor(rootStore, BaseTransactionFormStore : BaseTransactionFormStore) {
    super(rootStore)
    this.transactionStore = BaseTransactionFormStore
  }

  /**
   * Show action sheet where user can select what metadata to add
   */
  @action.bound
  public showAddMetadata() {
    this.ui.menuAction.show('metadata.title' ,this.actions)
  }

  @computed
  public get canAdd() {
    return this.actions.length > 0
  }

  @computed
  private get actions() {
    return this.listOfActions.filter(({ present }) => !present).map((pill) => ({
      ...pill,
      onPress: pill.onEdit
    }))
  }

  @computed
  public get listOfActions() {
    return [
      this.notePill,
      this.urlPill
    ]
  }

  /**
   * Return all metadata pills used to render list in ui
   */
  @computed
  public get all() : TMetadataPill[] {
    return this.listOfActions.filter(({ present }) => present)
  }

  @computed
  private get urlPill() : TMetadataPill {
    return {
      icon: 'web',
      preview: this.transactionStore?.url,
      title: 'metadata.url.add',
      text: this.transactionStore?.url,
      present: this.transactionStore?.url?.length > 0,
      onDelete: this.clearUrl,
      onEdit: this.editUrl
    }
  }

    /**
   * Show dialog with input allowing user for adding note
   */
  private editUrl = flow(function * (this : TransactionMetadataStore) {
    const url = yield this.ui.inputDialog.show('metadata.url.input', this.transactionStore.url)
    if (url === null) {
      return
    }

    if (url.length > 0) {
      this.transactionStore.url = url
    } else {
      this.transactionStore.url = null
    }
  }.bind(this))

  private clearUrl = flow(function * (this : TransactionMetadataStore) {
    if (yield this.ui.confirm.show('metadata.url.clear.title', 'metadata.url.clear.message')) {
      this.transactionStore.url = ''
    }
  }.bind(this))

  //#region Edit notes
  /**
   * Note edit pill
   */
  @computed
  private get notePill(): TMetadataPill {
    return {
      icon: 'note',
      title: 'metadata.notes.add',
      text: this.transactionStore?.notes,
      present: this.transactionStore.notes?.length > 0,
      onDelete: this.clearNotes,
      onEdit: this.editNotes
    }
  }
  /**
   * Show dialog with input allowing user for adding note
   */
  private editNotes = flow(function * (this : TransactionMetadataStore) {
    const note = yield this.ui.inputDialog.show('metadata.notes.input', this.transactionStore.notes)
    if (note === null) {
      return
    }

    if (note.length > 0) {
      this.transactionStore.notes = note
    } else {
      this.transactionStore.notes = null
    }
  }.bind(this))

  private clearNotes = flow(function * (this : TransactionMetadataStore) {
    if (yield this.ui.confirm.show('metadata.notes.clear.title', 'metadata.notes.clear.message')) {
      this.transactionStore.notes = ''
    }
  }.bind(this))
  //#endregion

  @action.bound
  public clear(): void {
    
  }
}