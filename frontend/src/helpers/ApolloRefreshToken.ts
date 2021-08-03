import SessionStore from '../stores/SessionStore'

export default class ApolloRefreshToken {
  private refreshing : boolean;
  private resolvers : Array<Function> = []
  private sessions : SessionStore

  constructor(sessions : SessionStore) {
    this.sessions = sessions
  }

  public refreshToken() : Promise<void> {
    return new Promise<void>((resolve) => {
      this.resolvers.push(resolve)

      if (!this.refreshing) {
        this.sessions.refreshServerToken().then(this.onRefreshEnd).catch(this.onRefreshEnd)
        this.refreshing = true
      }
    })
  }

  private onRefreshEnd = () => {
    this.refreshing = false
    this.resolvers.forEach((resolve) => resolve())
    this.resolvers = []
  }
}