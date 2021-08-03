import { Platform } from 'react-native'
import jwt_decode from 'jwt-decode'
import moment from 'moment-timezone'
import base64 from 'base-64'
import AsyncStorage from '@react-native-community/async-storage'
import { observable, action, computed, flow, runInAction } from 'mobx'
import * as Kechain from '../helpers/Keychain/index'
import { NonPersistableStore } from './SubStore'
import { SignInPayload } from '../api/graphql'
import { getDeviceName } from '../helpers/deviceInfo'
import generateProofOfWork from '../helpers/proofOfWork'
import logger from '../helpers/logger'

function getEndpointUrl(overwriteEndpointUrl: string) {
  if (Platform.OS === "web") {
    return process.env['API_ENDPOINT'] || `${window.location.protocol}//${window.location.host}/api`
  } else {
    return overwriteEndpointUrl
  }
}

/**
 * Current user session management, allowing logging in, logging out refreshing token, quick login etc
 */
export default class SessionStore extends NonPersistableStore {
  private log = logger('SessionStore')
  @observable
  public accessToken : string
  @observable
  public refreshToken : string
  @observable
  private _endpointUrl : string

  @action
  public changeEndpoint = (newEndpoint : string) => {
    this._endpointUrl = newEndpoint
    this.save()
  }

  @computed
  public get endpointUrl() {
    return getEndpointUrl(this._endpointUrl)
  }

  @computed
  private get accessTokenData() {
    return JSON.parse(base64.decode(this.accessToken.split('.')[1]))
  }

  @computed
  private get tokenExpiresAt() {
    const { exp } = this.accessTokenData
    return moment(exp * 1000).subtract(1, 'minute')
  }

  private get isAccessTokenExpired() {
    if (!this.accessToken) {
      return true
    }

    return this.tokenExpiresAt.isBefore(moment())
  }

  /**
   * Reload data from disk
   */
  public reload = flow(function * (this : SessionStore) {
    const { endpoint, refreshToken, accessToken } : any = yield Kechain.loadEndpointAndPassword()
    this._endpointUrl = Platform.OS === "web" ? process.env['API_ENDPOINT'] : endpoint
    this.refreshToken = refreshToken
    this.accessToken = accessToken

    this.log('Current endpoint url is', this._endpointUrl)

    yield this.refreshTokenIfNeeded()
  })

  /**
   * Sign in user to backend server
   * @param username
   * @param password
   */
  public signIn = flow(function * (this : SessionStore, username : string, password : string) {
    try {
      const jwtToken = yield this.api.sessions.nonce()

      const proofOfWork = yield generateProofOfWork({
        jwtToken, username, password
      })

      const deviceName = yield getDeviceName()
      const { errors, refreshToken } : SignInPayload = yield this.api.sessions.signIn(
        username,
        password,
        deviceName || 'unknown',
        proofOfWork
      )

      if (refreshToken) {
        runInAction(() => {
          this.refreshToken = refreshToken.token
        })
        yield this.refreshServerToken()
        yield this.save()
        yield this.root.refresh()
      }

      if (errors.length > 0) {
        yield this.ui.notifications.showErrors(errors)
      }

      return errors
    } catch (e) {
      const errors = [e]
      yield this.ui.notifications.showErrors(errors)
      return errors
    }
  }.bind(this))

  @action
  public getEndpointUrlFromJwt = (token : string) => {
    const { iss } = jwt_decode(token)
    this._endpointUrl = iss
  }

  public quickLogin = flow(function * (this : SessionStore, token : string) {
    this.state = "Loading"

    const deviceName = yield getDeviceName()
    const { refreshToken, errors } = yield this.api.sessions.quickSignIn(token, deviceName)

    if (errors.length > 0) {
      this.root.ui.notifications.show({
        message: errors.join(', '),
      })
      this.state = "Ready"
    } else {
      this.refreshToken = refreshToken.token
      yield this.refreshServerToken()
      yield this.save()
      this.state = "Ready"
      yield this.root.refresh()
    }
  }.bind(this))

  @action.bound
  public async refreshTokenIfNeeded() {
    if (this.isSignedIn && this.isAccessTokenExpired) {
      await this.refreshServerToken()
    }
  }

  /**
   * Refresh access token
   */
  @action.bound
  public async refreshServerToken() {
    if (!this.isSignedIn) {
      await this.logout()
      return
    }
    try {
      const accessToken = await this.api.sessions.refreshAccessToken(this.refreshToken)

      if (accessToken) {
        runInAction(() => {
          this.accessToken = accessToken
          this.save()
        })

      } else {
        await this.logout()
      }
    } catch (e) {
      this.log('Could not refresh token', e)
    }
  }

  /**
   * Save session credentials to disk
   */
  @action
  public async save() {
    await Kechain.saveEndpointAndPassword({
      endpoint: this.endpointUrl,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    })
  }

  @action
  public async clear() {
    runInAction(() => {
      this._endpointUrl = null
      this.accessToken = null
      this.refreshToken = null
    })
    await AsyncStorage.clear()
    await this.save()
    this.state = 'Ready'
  }

  @computed
  public get isSignedIn() : boolean {
    return !!(this.endpointUrl && this.refreshToken)
  }

  private logout = flow(function * (this : SessionStore) {
    this.log('Session logout and clearing storage')
    this.state = 'Saving'
    if (this.isSignedIn) {
      yield this.api.sessions.logout()
    }
    yield this.clear()
    yield this.root.clear()
  }.bind(this))

  public signOut = flow(function * (this : SessionStore) {
    if (yield this.ui.confirm.show('dialogs.sign_out.title', 'dialogs.sign_out.message')) {
      yield this.logout()
    }
  }.bind(this))
}