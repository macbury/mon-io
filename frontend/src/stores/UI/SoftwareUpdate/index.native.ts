import { action, computed } from 'mobx'
import bind from 'bind-decorator'
import * as UpdateAPK from 'rn-update-apk'
import AbstractSoftwareUpdateStore from './base'
import logger from '../../../helpers/logger'
import { NotificationModule } from '../../../modules/NotificationModule'

export default class SoftwareUpdateStore extends AbstractSoftwareUpdateStore {
  private readonly log = logger('SoftwareUpdateStore')
  private updater : UpdateAPK.UpdateAPK

  @computed
  private get updateOptions() {
    return {
      apkVersionUrl: this.apkVersionUrl,
      fileProviderAuthority: 'com.monio.provider',
      onError: err => {
        this.log("onError callback called", err);
      }
    }
  }

  /**
   * This check is done by background service every one hour, and will only display notification about new version
   */
  @bind
  public checkInBackground() : Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.updater != null) {
        return
      }

      this.log('Hitting for update information: ', this.apkVersionUrl)
      this.updater = new UpdateAPK.UpdateAPK({
        ...this.updateOptions,
        onError: reject,
        needUpdateApp: (needUpdate) => {
          if (needUpdate) {
            this.log("Update ready, show notification")

            NotificationModule.showNotification(
              33,
              this.i18n.t('notifications.update.title'),
              this.i18n.t('notifications.update.description'),
              { forceTriggerUpdate: true }
            )

            resolve(true)
          } else {
            resolve(false)
          }

          this.updater = null
        }
      })

      this.updater.checkUpdate()
    })
  }

  @action.bound
  public check(force?: boolean) {
    if (this.updater == null) {
      this.updater = new UpdateAPK.UpdateAPK({
        ...this.updateOptions,
        needUpdateApp: this.prepareToDownload,
        downloadApkProgress: this.updateDownloadProgress,
        downloadApkEnd: this.startUpdateProcess,
      })
    }

    this.log('Hitting for update information: ', this.apkVersionUrl)

    if (force || process.env.NODE_ENV !== 'development') {
      this.updater.checkUpdate()
    }
  }

  @action.bound
  private prepareToDownload(needUpdate) {
    this.log('needUpdate', needUpdate)
    if (needUpdate) {
      needUpdate(true)
      this.refreshState = 'UpToDate'
      this.updater = null
    } else {
      this.refreshState = 'Downloading'
    }
  }

  @action.bound
  private updateDownloadProgress(progress : number) {
    this.progress = progress
    this.refreshState = 'Downloading'
  }

  @action.bound
  private startUpdateProcess() {
    this.log('Apk downloaded!')
    this.refreshState = 'ReadyToInstall'
  }
}
