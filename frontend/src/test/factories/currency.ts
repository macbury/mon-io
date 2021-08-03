import * as Factory from 'factory.ts'
import { Currency } from '../../api/graphql'

export const currency = Factory.Sync.makeFactory<Currency>({
  id: 'PLN',
  isoCode: 'PLN',
  subunitToUnit: 100,
  name: 'Polish zloty',
  symbol: 'zł'
})
