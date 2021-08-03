import { flow, observable, action, runInAction } from 'mobx'
import remotedev from 'mobx-remotedev'

import AsyncStorage from '@react-native-community/async-storage'
import logger from '../helpers/logger'

import MonioApi from '../api'
import UI from './UI'
import Screens from './Screens'

import SessionStore from './SessionStore'
import CategoriesStore from './CategoriesStore'
import SettingsStore from './SettingsStore'
import AboutStore from './AboutStore'

@remotedev({ name: "Monio" })
export default class RootStore {
  public readonly session : SessionStore
  public readonly categories : CategoriesStore
  public readonly settings : SettingsStore
  public readonly about : AboutStore

  public readonly screens : Screens
  public readonly ui : UI

  public api : MonioApi

  @observable
  public error : Error

  @observable
  public processing : boolean = false
  /**
   * Backend have different version and needs an update...
   */
  @observable
  public updateRequired : boolean = false

  private log = logger('RootStore')

  constructor() {
    this.log('Initializing...')

    this.ui = new UI(this)
    this.screens = new Screens(this)

    this.session = new SessionStore(this)
    this.categories = new CategoriesStore(this)
    this.settings = new SettingsStore(this)
    this.about = new AboutStore(this)
  }

  /**
   * Initialize all stores
   */
  public setup = flow(function * (this : RootStore, api : MonioApi) {
    this.log('Running main setup for RootStore')
    this.api = api

    yield this.session.reload()

    return this.session.isSignedIn
  })

  public loadCache = flow(function * (this : RootStore) {
    try {
      yield Promise.all([
        this.settings.restore(),
        this.about.restore(),
        this.categories.restore(),
        this.screens.sidebar.restore(),
        this.screens.receipts.restore(),
        this.screens.receipts.planned.restore(),
        this.screens.summary.restore(),
        this.screens.budget.restore(),
        this.screens.series.restore(),
        this.screens.map.restore(),
        this.screens.charts.ie.restore(),
        this.screens.imports.restore()
      ])
    } catch (e) {
      this.log('Restore of the stores failed', e)
    }
  }.bind(this))

  /**
   * Just fetch data from server and refresh data, mainly used in background to ensure data is synced
   */
  public fetchAll = flow(function * (this : RootStore) {
    yield 
    yield Promise.all([
      this.screens.uploadReceipts.pushExisting(),
      this.settings.forceFetch(),
      this.about.fetch(),
      this.categories.fetchAll(),
      this.screens.receipts.fetchAll(),
      this.screens.receipts.planned.fetch(),
      this.screens.summary.period?.fetch()
    ])
  }.bind(this))

  public refresh = flow(function * (this : RootStore) {
    this.log('Refresh')
    try {
      yield Promise.all([
        this.settings.fetch(),
        this.about.refresh(),
        this.categories.refresh(),
        this.screens.uploadReceipts.pushExisting()
      ])
    } catch (e) {
      this.log('Refresh of the stores failed', e)
    }
  }.bind(this))

  @action.bound
  public setError(error: Error) {
    this.error = error
  }

  /**
   * Clear all data stored in local storage and all stores,
   * except the session store
   */
  @action
  public clear() {
    this.error = null
    this.screens.clear()
    runInAction(async () => {
      await Promise.all([
        this.settings.clear(),
        this.about.clear(),
        this.settings.clear(),
        this.categories.clear(),
        AsyncStorage.clear()
      ])
    })
  }
}