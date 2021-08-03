import { action, flow, observable, computed, reaction } from 'mobx'
import moment, { Moment } from 'moment-timezone'
import { unique } from 'underscore'

import { PlannedTransaction, Transaction, TransactionSeries } from '../../api/graphql'
import SubStore from '../SubStore'
import CategoryFilterStore from '../UI/CategoryFilterStore'

type ExecutedOrPlannedTransaction = PlannedTransaction | Transaction

export type PlannedItems = {
  date: Moment
  items: ExecutedOrPlannedTransaction[]
}

function lzero(val : number) {
  if (val < 10) {
    return `0${val}`
  }
  return val.toString()
}

export default class SeriesStore extends SubStore<any> {
  public filter : CategoryFilterStore
  @observable
  private plannedTransactions : PlannedTransaction[] = []
  @observable
  private executedTransactions : Transaction[] = []
  @observable
  public calendarUrl : string
  @observable
  public currentMonth : Moment

  constructor(root) {
    super(root)
    this.filter = new CategoryFilterStore(root, null, [])
    this.state = "None"
  }

  @action.bound
  public initialize() {
    reaction(() => this.currentMonth?.format('YYYY-MM') || '', () => {
      this.plannedTransactions = this.executedTransactions = []
      this.filter.refresh()
      this.reload()
    })
  }

  @computed
  public get currentDate() {
    return this.currentMonth || moment()
  }

  @computed
  public get planned() {
    return [...this.plannedTransactions, ...this.executedTransactions].filter(({ category: { id } }) => this.filter.selectedCategoriesIds.includes(id))
  }

  @computed
  private get days() {
    return this.groupedByDate.map(({ date }) => date.format('YYYY-MM-DD'))
  }

  @computed
  public get markedDates() {
    return this.groupedByDate.reduce((out, { date, items }) => {
      out[date.format('YYYY-MM-DD')] = {
        dots: unique(items.map(({ category: { color } }) => color)).map((color) => ({ color, id: color }))
      }

      return out
    }, {})
  }

  @computed
  public get scrollIndex() {
    if (!this.currentMonth) {
      return -1
    }

    const currentDay = this.currentMonth.format('YYYY-MM-DD')
    return this.days.findIndex((dayInTheList : string) => dayInTheList === currentDay)
  }

  private buildDaysGroupMap(today : Moment) {
    const days = {}
    for (let day = 1; day <= today.daysInMonth(); day++) {
      let date = today.format(`YYYY-MM-${lzero(day)}`)

      days[date] = []
    }
    return days
  }

  @computed
  public get groupedByDate() : Array<PlannedItems> {
    const collectedPlannedItems = this.planned.reduce((groups, plannedTransaction) => {
      const date = moment(plannedTransaction.date || plannedTransaction.createdAt).format('YYYY-MM-DD')
      groups[date]?.push(plannedTransaction)
      return groups
    }, this.buildDaysGroupMap(this.currentDate))

    return Object.keys(collectedPlannedItems).map((date) => ({ date: moment(date), items: collectedPlannedItems[date] }))
  }

  @action.bound
  public changeMonth(month : string) {
    this.currentMonth = month === 'today' ? moment() : moment(month)
  }

  public showCalendarUrl = flow(function * (this : SeriesStore) {
    yield this.ui.progressDialog.show('pages.series.dialog.download_calendar_url')
    this.calendarUrl = yield this.api.series.getCalendarUrl()
    yield this.ui.progressDialog.close()

    yield this.ui.copyContent.show(
      'pages.series.dialog.calendar_url.title', 
      'pages.series.dialog.calendar_url.message',
      this.calendarUrl
    )
  }.bind(this))

  public reload = flow(function * (this : SeriesStore) {
    if (this.isLoading || this.isRefreshing) {
      return
    }

    this.state = (this.plannedTransactions.length + this.executedTransactions.length > 0) ? 'Refreshing' : 'Loading'

    const month = this.currentDate.format('YYYY-MM-01')
    try {
      const [plannedTransactions, executedTransactions] = yield Promise.all([
        this.api.series.getPlannedTransactions(month, true),
        this.api.transactions.filter({ month, series: TransactionSeries.Repeating })
      ])

      this.plannedTransactions = plannedTransactions
      this.executedTransactions = executedTransactions.nodes
    } catch (e) {
      this.root.ui.notifications.show({
        message: e.toString(),
        retryAction: this.reload
      })
    }

    this.state = 'Ready'
  }.bind(this))

  public ignoreDate = flow(function * (this : SeriesStore, seriesId : string, date : string | Moment) {
    const confirmed = yield this.ui.confirm.show('pages.series.dialog.ignore.title', 'pages.series.dialog.ignore.message')
    
    if (confirmed) {
      yield this.ui.progressDialog.show('pages.series.progress.ignore')
      yield this.api.series.ignoreDate(seriesId, date)
      this.deletePlannedTransaction(seriesId, date)
      yield this.ui.progressDialog.close()
    }
  }.bind(this))

  public delete = flow(function * (this : SeriesStore, seriesId : string, date : string | Moment) {

  }.bind(this))

  @action.bound
  private deletePlannedTransaction(seriesId : string, date : string | Moment) {
    this.plannedTransactions = this.plannedTransactions.filter((plannedTransaction) => {
      if (plannedTransaction.series.id === seriesId && plannedTransaction.date === date) {
        return false
      } else {
        return true
      }
    })
  }

  @action.bound
  public async clear() {
    this.currentMonth = null
    this.calendarUrl = null
    this.plannedTransactions = this.executedTransactions = []
    this.state = "None"
    this.filter.clear()
  }

  @computed
  public get cacheKey(): string {
    return `Series/${this.currentDate.format('YYYY-MM-01')}`
  }

  protected toBundle() {
    const { plannedTransactions, executedTransactions } = this

    return {
      plannedTransactions, executedTransactions
    }
  }
  protected loadBundle({ plannedTransactions, executedTransactions }): void {
    this.plannedTransactions = plannedTransactions
    this.executedTransactions = executedTransactions
  }
}