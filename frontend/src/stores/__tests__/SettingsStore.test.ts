import SettingsStore from '../SettingsStore'
import { User } from '../../api/graphql'
import { mockApi, ResolversMock } from '../../test/graphql'

function build(resolvers : ResolversMock, fields = {}) {
  return new SettingsStore({
    api: mockApi(resolvers),
    ui: {
      notifications: {
        show: jest.fn()
      }
    },
    ...fields
  })
}

describe('SettingsStore', () => {
  xit('fetch downloads newest settings', async () => {
    const settings = build({
      Query: {
        me: () => ({
          id: '123',
          username: 'yolo',
          settings: {
            locale: 'pln',
            ocrLanguages: [],
            currencies: [],
            downloadBackupUrl: '',
            downloadApkUrl: '',
            mainCurrency: {
              id: 'eur',
              isoCode: 'eur',
              name: 'eur',
              subunitToUnit: 100,
              symbol: 'eur'
            },
            timezone: '',
            usedCurrencies: []
          }
        } as User)
      }
    })

    await settings.fetch()

    expect(settings.username).toEqual('yolo')
    expect(settings.locale).toEqual('pln')
  })

  it('fetch quick login token', async () => {
    const settings = build({
      Mutation: {
        quickLoginToken: () => ({
          token: 'quick-login-token'
        })
      }
    }, {
      session: {
        refreshToken: 'test'
      }
    })

    await settings.refreshQuickLoginToken()
    expect(settings.quickLoginToken).toEqual('quick-login-token')
  })
})