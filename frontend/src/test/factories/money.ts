import * as Factory from 'factory.ts'
import { Money } from '../../api/graphql'
import { currency } from './currency'

export const money = Factory.Sync.makeFactory<Money>({
  cents: 1000,
  currency: Factory.Sync.each(() => currency.build())
})