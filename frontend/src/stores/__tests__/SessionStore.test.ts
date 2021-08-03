import SessionStore from '../SessionStore'
import { mockApi, ResolversMock } from '../../test/graphql'

function build(resolvers : ResolversMock, fields = {}) {
  return new SessionStore({
    api: mockApi(resolvers),
    ...fields
  } as any)
}

describe('SessionStore', () => {
  it('signIn sets token from signInRequest', async () => {
    const store = build({
      Query: {
        nonce: () => 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsibm9uY2UiXSwibm9uY2UiOiI0ZDMxYmYxZWUwZDBjZTUzMjYxMjkxOTg5MWQ4MzJjNDlkZWE4ZDA2ZTJkMWE4OTFkYzc4NjNkMGFkNDIyMTkzIiwiZGlmZmljdWx0eSI6IjAwMCIsImV4cCI6MTYwMTgwMzU0N30.JN9xqP_YnQwMjr1v9LwxqQmFqX9rJpPF--sIfKpJw4k'
      },
      Mutation: {
        signIn: () => ({
          refreshToken: {
            id: 'my-id',
            token: 'refresh-token'
          },
          errors: []
        })
      }
    }, {
      refresh: jest.fn()
    })

    await store.signIn('username', 'password')

    expect(store.refreshToken).toEqual('refresh-token')
  })

  it('quick login with token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovLzc5MGU1NjA4Lm5ncm9rLmlvL2FwaSIsImF1ZCI6WyJxdWlja19sb2dpbiJdLCJyZWZyZXNoX3Rva2VuX2lkIjoiNTdmNjllZjUtMGRhOC00MTE2LWI2NjQtNTBlNzhjM2ZkYTM5IiwiZXhwIjoxNTgzNjc2ODMzfQ.5pAkJ8bhAPXOiN8femeJLO-QM9iQMjtOD-yxb-mXgHE'

    const store = build({
      Mutation: {
        quickSignIn: () => ({
          refreshToken: {
            token: 'refreshToken'
          },
          errors: []
        }),

        refreshAccessToken: () => ({
          refreshAccessToken: {
            accessToken: 'accessToken',
            errors: []
          }
        })
      }
    })

    await store.getEndpointUrlFromJwt(token)
    expect((store as any)._endpointUrl).toEqual('https://790e5608.ngrok.io/api')

    // await store.quickLogin(token)
    // expect(store.refreshToken).toEqual('sss')
  })
})