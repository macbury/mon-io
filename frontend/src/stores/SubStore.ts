import AsyncStorage from '@react-native-community/async-storage'
import { observable, computed, runInAction } from 'mobx'
import bind from 'bind-decorator'
import { StoreState } from './types'
import RootStore from './RootStore'
import MonioApi from '../api'
import appInfo from '../about.json'
import i18n from '../config/i18n'

export const KEY_NAMESPACE = '@monio'

export default abstract class SubStore<TBundle> {
  @observable
  protected readonly i18n = i18n
  protected readonly root : RootStore
  /**
   * Defines in what state is store:
   * - None: is empty and uninitialized
   * - Loading: don't have data and fetching new one from server(in this case show full screen loader)
   * - Refreshing: data is fetched but outdated(show only small notification about update)
   * - Ready: fetching is done, you can have data or some kind of errors
   */
  @observable
  public state : StoreState = "None"

  constructor(root : RootStore) {
    this.root = root
    this.initialize()
  }

  public initialize() {

  }

  protected get ui() {
    return this.root.ui
  }

  protected get screens() {
    return this.root.screens
  }

  /**
   * Main interface to interact with our backend
   */
  protected get api() : MonioApi {
    return this.root.api
  }

  /**
   * Check if global processing is enabled
   */
  protected get processing() : boolean {
    return this.root.processing
  }

  protected set processing(newProcessing : boolean) {
    this.root.processing = newProcessing
  }

  @computed
  public get isLoading() {
    return this.state === "Loading"
  }

  @computed
  public get isRefreshing() {
    return this.state === "Refreshing"
  }

  @computed
  public get isSaving() {
    return this.state === "Saving"
  }

  @computed
  public get isReady() {
    return this.state === "Ready"
  }

  @computed
  public get isNotFound() {
    return this.state === "NotFound"
  }

  @computed
  public get isNone() {
    return this.state === "None"
  }

  public abstract clear() : void

  /**
   * Cache key used for storing data in local storage
   */
  abstract get cacheKey() : string;

  protected abstract toBundle() : TBundle;
  protected abstract loadBundle(data : TBundle) : void;

  private get storeKey() {
    return [KEY_NAMESPACE, appInfo.commit, this.cacheKey].join('/')
  }

  /**
   * Save serialized state of this store
   */
  @bind
  protected async persist() {
    const bundle = this.toBundle()

    if (!bundle) {
      await AsyncStorage.removeItem(this.storeKey)
      //log("No bundle data, removing key", this.storeKey)
      return
    }

    const serialized = JSON.stringify(bundle)
    await AsyncStorage.setItem(this.storeKey, serialized)
    //log("Persisted data to", this.storeKey)
  }

  /**
   * Load state from storage
   */
  @bind
  public async restore() {
    const rawData = await AsyncStorage.getItem(this.storeKey)
    if (rawData) {
      //log("Restoring data for", this.storeKey)
      const data = JSON.parse(rawData)
      runInAction(() => {
        this.loadBundle(data)
      })
    }
  }
}

export abstract class NonPersistableStore extends SubStore<any> {
  get cacheKey(): string {
    return 'NonPersistableStore'
  }

  protected toBundle() : any {
    return {}
  }

  protected loadBundle(data: any) : void {

  }
}