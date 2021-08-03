import { action, flow, observable, computed } from 'mobx'
import bind from 'bind-decorator'
import SubStore from './SubStore'
import { User, Currency } from '../api/graphql'
import { ThemeMode } from '../config/types'
import logger from '../helpers/logger'

/**
 * This store contains settings information for the application
 */
export default class SettingsStore extends SubStore<any> {
  private log = logger('SettingsStore')
  @observable
  public themeMode : ThemeMode = 'dark'
  @observable
  public username : string
  @observable
  public avatarUrl : string
  @observable
  public mapBoxKey : string
  @observable
  public quickLoginToken : string
  @observable
  public downloadBackupUrl : string
  @observable
  public downloadApkUrl : string
  @observable
  public sentryKey : string
  @observable
  public locale : string
  @observable
  public mainCurrency : Currency
  @observable
  public currencies : Currency[] = []
  @observable
  public usedCurrencies : Currency[] = []

  public changeThemeMode = flow(function * (this : SettingsStore) {
    this.themeMode = yield this.ui.radioPicker.show(this.i18n.t('dialogs.theme.title'), this.themeMode, [
      { title: this.i18n.t('dialogs.theme.options.system'), value: null },
      { title: this.i18n.t('dialogs.theme.options.dark'), value: 'dark' },
      { title: this.i18n.t('dialogs.theme.options.light'), value: 'light' }
    ])

    this.persist()
  }.bind(this))

  @computed
  public get mainCurrencyIsoCode() {
    if (this.mainCurrency === null) {
      return 'EUR'
    } else {
      return this.mainCurrency.isoCode
    }
  }

  public get timezoneName() {
    return 'Europe/Warsaw' //TODO fetch from server
  }

  @computed
  public get quickLoginUrl() {
    if (this.quickLoginToken) {
      return `monio://quickAuth?token=${encodeURIComponent(this.quickLoginToken)}`
    }
    return null
  }

  public refreshQuickLoginToken = flow(function * (this : SettingsStore) {
    this.quickLoginToken = yield this.api.sessions.generateQuickLoginToken(this.root.session.refreshToken)
  }.bind(this))

  public refresh = flow(function * (this : SettingsStore) {
    yield this.restore()
  })

  @action
  private setUser(user : User) {
    if (user) {
      const {
        settings: {
          mapBoxKey,
          sentryKey,
          locale,
          mainCurrency,
          currencies,
          usedCurrencies,
          downloadBackupUrl,
          downloadApkUrl
        },
        avatarUrl,
        username
      } = user

      this.avatarUrl = avatarUrl
      this.username = username
      this.sentryKey = sentryKey
      this.locale = locale
      this.mainCurrency = mainCurrency
      this.currencies = currencies
      this.usedCurrencies = usedCurrencies
      this.mapBoxKey = mapBoxKey
      this.downloadBackupUrl = downloadBackupUrl
      this.downloadApkUrl = downloadApkUrl
    } else {
      this.avatarUrl = null
      this.username = null
      this.sentryKey = null
      this.locale = 'en'
      this.mainCurrency = null
      this.usedCurrencies = null
      this.mapBoxKey = null
      this.downloadBackupUrl = null
      this.downloadApkUrl = null
    }

    this.persist()
  }

  public get cacheKey(): string {
    return 'settings'
  }

  protected toBundle() {
    const {
      username,
      sentryKey,
      locale,
      mainCurrency,
      currencies,
      usedCurrencies,
      mapBoxKey,
      downloadBackupUrl,
      downloadApkUrl,
      themeMode
    } = this

    return {
      username,
      sentryKey,
      locale,
      mainCurrency,
      currencies,
      usedCurrencies,
      mapBoxKey,
      downloadBackupUrl,
      downloadApkUrl,
      themeMode
    }
  }

  protected loadBundle(data: any) {
    const {
      username,
      sentryKey,
      locale,
      mainCurrency,
      currencies,
      usedCurrencies,
      mapBoxKey,
      downloadBackupUrl,
      downloadApkUrl,
      themeMode
    } = data

    this.username = username
    this.sentryKey = sentryKey
    this.locale = locale
    this.mainCurrency = mainCurrency
    this.currencies = currencies
    this.usedCurrencies = usedCurrencies
    this.mapBoxKey = mapBoxKey
    this.downloadBackupUrl = downloadBackupUrl
    this.downloadApkUrl = downloadApkUrl
    this.themeMode = themeMode
  }

  public forceFetch = flow(function * (this : SettingsStore) {
    const user = yield this.api.sessions.me()
    if (user) {
      this.setUser(user)
    }
  }.bind(this))

  public fetch = flow(function * (this : SettingsStore) {
    yield this.restore()

    if (this.username) {
      this.state = "Refreshing"
      this.api.sessions.me().then((user) => {
        this.setUser(user)
        this.state = "Ready"
      }).catch((e) => {
        this.root.ui.notifications.show({
          message: e.toString(),
          retryAction: this.fetch
        })

        this.state = "Ready"
      })
    } else {
      this.state = "Loading"
      try {
        this.setUser(yield this.api.sessions.me())
      } catch (e) {
        this.root.ui.notifications.show({
          message: e.toString(),
          retryAction: this.fetch
        })
      }
      this.state = "Ready"
    }
  }.bind(this))

  @action
  public async clear() {
    this.setUser(null)
  }
}