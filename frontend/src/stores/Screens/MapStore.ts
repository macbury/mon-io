import { action, flow, observable, reaction } from 'mobx'
import CategoryFilterStore from '../UI/CategoryFilterStore'
import { LocationSummary, TransactionCategoryKind } from '../../api/graphql'
import SubStore from '../SubStore'

export default class MapStore extends SubStore<any> {
  public filter : CategoryFilterStore
  private fetchLocationsPromise : any
  @observable
  public locations: LocationSummary[] = []
  @observable
  public categoriesDialogVisible: boolean = false

  constructor(root) {
    super(root)
    this.filter = new CategoryFilterStore(root, this.onSelectedCategoriesChanged, [TransactionCategoryKind.Expense])
  }

  @action.bound
  public showCategoriesDialog() {
    this.categoriesDialogVisible = true
  }

  @action.bound
  public hideCategoriesDialog() {
    this.categoriesDialogVisible = false
  }

  @action.bound
  public onSelectedCategoriesChanged() {
    if (this.root.session.isSignedIn) {
      this.fetchLocationsPromise?.cancel()
      this.fetchLocationsPromise = this.fetchLocations()
    }
  }

  @action.bound
  public reload() {
    this.filter.clear()
    this.locations = []
    this.refresh()
  }

  public refresh = flow(function * (this : MapStore) {
    yield this.filter.refresh()
  }.bind(this))

  public fetchLocations = flow(function * (this : MapStore) {
    try {
      this.locations = yield this.api.location.getMap(this.filter.selectedCategoriesIds)
    } catch(e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: this.fetchLocations
      })
    }
    this.fetchLocationsPromise = null
  }.bind(this))

  public get cacheKey(): string {
    return 'map'
  }

  protected toBundle() {
    const {
      locations
    } = this

    return {
      locations
    }
  }

  protected loadBundle({ locations }: any): void {
    this.locations = locations
  }

  @action.bound
  public clear(): void {
    this.locations = []
    this.filter.clear()
    this.categoriesDialogVisible = false
  }
}