import { flow, observable, action } from 'mobx'
import { Session } from '../../api/graphql'
import { NonPersistableStore } from '../SubStore'

export default class SessionsStore extends NonPersistableStore {
  @observable
  public refreshTokens : Session[] = []
  @observable
  public longLivingRefreshTokens : Session[] = []

  public createNewToken = flow(function * (this : SessionsStore) {
    const tokenName = yield this.ui.inputDialog.show('pages.refresh_token.long_lived_access_tokens.title', '')
    if (!tokenName) {
      return
    }

    yield this.ui.progressDialog.show('pages.refresh_token.long_lived_access_tokens.dialog.saving')
    const { errors, refreshToken } = yield this.api.sessions.createLongLivingToken(tokenName)

    if (refreshToken) {
      this.longLivingRefreshTokens = [refreshToken].concat(this.longLivingRefreshTokens)

      const accessToken = yield this.api.sessions.getLongLivingToken(refreshToken.id)
      yield this.ui.progressDialog.close()
      this.ui.copyContent.show(
        'pages.refresh_token.long_lived_access_tokens.copy_dialog.title',
        'pages.refresh_token.long_lived_access_tokens.copy_dialog.message',
        accessToken
      )
    } else {
      yield this.ui.progressDialog.close()
      yield this.ui.notifications.showErrors(errors)
    }
  }.bind(this))

  public fetch = flow(function * (this : SessionsStore) {
    this.state = this.longLivingRefreshTokens.length > 0 ? 'Refreshing' : 'Loading'
    try {
      const {
        refreshTokens,
        longLivingRefreshTokens
      } = yield this.api.sessions.all()
      this.refreshTokens = refreshTokens
      this.longLivingRefreshTokens = longLivingRefreshTokens
      this.state = 'Ready'
    } catch (error) {
      this.ui.notifications.showError(error, this.fetch)
    }
  }.bind(this))

  public destroy = flow(function * (this: SessionsStore, refreshTokenId : string) {
    const confirmed = yield this.ui.confirm.show('pages.refresh_token.destroy.title', 'pages.refresh_token.destroy.message')

    if (!confirmed) {
      return
    }

    yield this.ui.progressDialog.show('pages.refresh_token.long_lived_access_tokens.dialog.destroying')
    try {
      const success = yield this.api.sessions.destroy(refreshTokenId)

      if (success) {
        this.refreshTokens = this.refreshTokens.filter(({ id }) => id !== refreshTokenId)
        this.longLivingRefreshTokens = this.longLivingRefreshTokens.filter(({ id }) => id !== refreshTokenId)
        this.ui.notifications.showSuccess('success.sessions.destroyed')
      }
    } catch (error) {
      this.ui.notifications.showError(error)
    }
    yield this.ui.progressDialog.close()
  }.bind(this))

  @action.bound
  public clear(): void {
    this.refreshTokens = []
    this.longLivingRefreshTokens = []
  }
}