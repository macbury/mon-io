import { action, observable } from 'mobx'
import logger from '../../helpers/logger'
import { NonPersistableStore } from '../SubStore'
import { NavigationNavigateAction } from 'react-navigation'

export type TAction = {
  /**
   * I18n key to translation
   */
  name: string
  url: NavigationNavigateAction
}

export interface INotification {
  message: string
  retryAction?()
  action?: TAction
}

/**
 * Manage displaying errors in snackbar
 */
export default class NotificationsStore extends NonPersistableStore {
  private readonly log = logger('NotificationsStore')
  @observable
  public current : INotification
  private timeoutHandler = null

  private startTimer() {
    this.clearTimer()
    this.timeoutHandler = setTimeout(this.hide, 5000)
  }

  private clearTimer() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
    }
    this.timeoutHandler = null
  }

  @action.bound
  public show = (notification : INotification) => {
    this.log('Show notification', notification)
    this.current = notification
    this.startTimer()
  }

  @action.bound
  public showSuccess(i18nKey : string) {
    this.show({
      message: this.i18n.t(i18nKey)
    })
  }

  @action.bound
  public editAction(i18nKey : string, url : NavigationNavigateAction) {
    this.show({
      message: this.i18n.t(i18nKey),
      action: {
        name: this.i18n.t('actions.edit'),
        url
      }
    })
  }

  @action.bound
  public showErrorKey(i18nKey : string, retryAction?) {
    this.show({
      message: this.i18n.t(i18nKey),
      retryAction
    })
  }

  @action.bound
  public showError(error : Error, retryAction?) {
    this.show({
      message: error.toString(),
      retryAction
    })
  }

  @action.bound
  public showErrors(errors : string[], retryAction?) {
    this.show({
      message: errors.join(','),
      retryAction
    })
  }

  @action.bound
  public hide() {
    this.current = null
    this.clearTimer()
  }

  @action.bound
  public async clear() {
    this.current = null
    this.clearTimer()
  }
}