import { action, flow, computed, reaction, observable } from 'mobx'
import debounce from 'debounce'
import moment, { Moment } from 'moment-timezone'
import { TransactionsExcel, TransactionSeries, TransactionReceipt, TransactionImport } from '../../../api/graphql'
import CategoryFilterStore from '../../UI/CategoryFilterStore'
import saveFile from '../../../helpers/saveFile'
import BaseTransactionStore, { CategoryFilter } from './BaseTransactionStore'
import SearchResult from './SearchResult'

const THROTTLE_SEARCH_TIMEOUT = 300

export default class TransactionsStore extends BaseTransactionStore {
  public categoryFilter : CategoryFilterStore
  @observable
  public result : SearchResult
  @observable
  public filtersDialogVisible : boolean = false
  @observable
  private oldFiltersDialogVisible : boolean = false

  constructor(root) {
    super(root)

    this.result = new SearchResult(this.root)
    this.categoryFilter = new CategoryFilterStore(this.root, this.performSearch, [])
    reaction(() => this.fromDate, this.performSearch)
    reaction(() => this.toDate, this.performSearch)
    reaction(() => this.series, this.performSearch)
    reaction(() => this.receipts, this.performSearch)
    reaction(() => this.imported, this.performSearch)

    this.clear()
  }

  @action.bound
  public showFiltersDialog() {
    this.filtersDialogVisible = true
  }

  @action.bound
  public hideFiltersDialog() {
    this.filtersDialogVisible = false
  }

  @action.bound
  private saveFilterDialogState() {
    this.oldFiltersDialogVisible = this.filtersDialogVisible
    this.filtersDialogVisible = false
  }

  @action.bound
  private restoreFilterDialogState() {
    this.filtersDialogVisible = this.oldFiltersDialogVisible
    this.oldFiltersDialogVisible = false
  }

  public downloadExcel = flow(function * (this : TransactionsStore) {
    this.ui.progressDialog.show('dialogs.transactions.export_excel.title')

    try {
      const report : TransactionsExcel = yield this.api.transactions.transactionsReport(this.result.getFilterOptions())

      yield saveFile(report.list.filename, report.list.url)
    } catch (error) {
      this.ui.notifications.showError(error, this.downloadExcel)
    }

    this.ui.progressDialog.close()
  }.bind(this))

  public adjustIsPlannedFilter = flow(function * (this : TransactionsStore) {
    this.saveFilterDialogState()

    const selectedSeries = yield this.ui.radioPicker.show(this.i18n.t('pages.transactions.filter.repeating.title'), this.series, [
      { title: this.i18n.t('pages.transactions.filter.repeating.value.All'), value: TransactionSeries.All },
      { title: this.i18n.t('pages.transactions.filter.repeating.value.Normal'), value: TransactionSeries.Normal },
      { title: this.i18n.t('pages.transactions.filter.repeating.value.Repeating'), value: TransactionSeries.Repeating },
    ])

    if (selectedSeries) {
      this.series = selectedSeries
    }

    this.restoreFilterDialogState()
  }.bind(this))

  public adjustHaveAttachedBillFilter = flow(function * (this : TransactionsStore) {
    this.saveFilterDialogState()

    const selectedReceipts = yield this.ui.radioPicker.show(this.i18n.t('pages.transactions.filter.bill.title'), this.receipts, [
      { title: this.i18n.t('pages.transactions.filter.bill.value.All'), value: TransactionReceipt.All },
      { title: this.i18n.t('pages.transactions.filter.bill.value.Attached'), value: TransactionReceipt.Attached },
      { title: this.i18n.t('pages.transactions.filter.bill.value.Without'), value: TransactionReceipt.Without },
    ])

    if (selectedReceipts) {
      this.receipts = selectedReceipts
    }

    this.restoreFilterDialogState()
  }.bind(this))

  public adjustImportFilter = flow(function * (this : TransactionsStore) {
    this.saveFilterDialogState()

    const selectedImport = yield this.ui.radioPicker.show(this.i18n.t('pages.transactions.filter.import.title'), this.imported, [
      { title: this.i18n.t('pages.transactions.filter.import.value.All'), value: TransactionImport.All },
      { title: this.i18n.t('pages.transactions.filter.import.value.Imported'), value: TransactionImport.Imported },
      { title: this.i18n.t('pages.transactions.filter.import.value.NotImported'), value: TransactionImport.NotImported },
    ])

    if (selectedImport) {
      this.imported = selectedImport
    }

    this.restoreFilterDialogState()
  }.bind(this))

  public pickFromDate = flow(function * (this : TransactionsStore) {
    this.saveFilterDialogState()
    const date = yield this.ui.datePicker.show(this.fromDate)
    if (date) {
      this.fromDate = date
    }
    this.restoreFilterDialogState()
  }.bind(this))

  public pickToDate = flow(function * (this : TransactionsStore) {
    this.saveFilterDialogState()

    const date = yield this.ui.datePicker.show(this.toDate)
    if (date) {
      this.toDate = date
    }
    this.restoreFilterDialogState()
  }.bind(this))

  public remove = flow(function * (this : TransactionsStore, transactionId: string) {
    if (this.result.contains(transactionId)) {
      this.createNewResult()
    }
  }.bind(this))

  @action.bound
  public setDateRange(fromDate: Moment, toDate: Moment) {
    this.fromDate = fromDate
    this.toDate = toDate
  }

  @action.bound
  public setQuery(query : string) {
    this.query = query
    this.search()
  }

  @action.bound
  public clearQuery() {
    this.clear()
    this.search()
  }

  public search = flow(function * (this : TransactionsStore, importId : string) {
    this.result.clear()
    this.importId = importId
    yield this.categoryFilter.refresh()

    this.performSearch()
  }.bind(this))


  private performSearch = debounce(() => {
    this.createNewResult()
  }, THROTTLE_SEARCH_TIMEOUT)

  @action.bound
  private createNewResult() {
    if (!this.root.session.isSignedIn) {
      return
    }

    this.result.update(
      this.query,
      this.categoryFilter.selectedCategoriesIds,
      this.fromDate,
      this.toDate,
      this.importId,
      this.series,
      this.receipts,
      this.imported
    )
  }

  @action.bound
  public async clear() {
    this.hideFiltersDialog()
    this.categoryFilter.clear()
    this.result?.clear()
    this.query = ''
    this.toDate = moment()
    this.importId = null
    this.fromDate = moment().subtract(30, 'years')
  }
}