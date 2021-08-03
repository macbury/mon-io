import * as Factory from 'factory.ts'
import { User } from '../../api/graphql'

const settings : any = {}

export const user = Factory.Sync.makeFactory<User>({
  id: Factory.Sync.each((seq) => `${seq}-000-000`),
  username: Factory.Sync.each((seq) => `user${seq}`),
  avatarUrl: 'fakeurl',
  settings,
  refreshTokens: [],
  longLivingRefreshTokens: []
})