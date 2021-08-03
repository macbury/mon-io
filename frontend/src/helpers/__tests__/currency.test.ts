import { formatMoney } from '../currency'
import { Money } from '../../api/graphql'

it('formats fiat currency', () => {
  const money : Money = {
    cents: 10000,
    currency: {
      id: 'PLN',
      isoCode: 'PLN',
      subunitToUnit: 100,
      name: 'Polish zloty',
      symbol: 'zł'
    }
  }
  const amount = formatMoney(money, false, false)
  expect(amount).toEqual('100.00 zł')
})

it('formats crypto currency', () => {
  const money : Money = {
    cents: 10000,
    currency: {
      id: "BTC",
      isoCode: "BTC",
      name: "Bitcoin",
      subunitToUnit: 100000000,
      symbol: "₿"
    }
  }
  const amount = formatMoney(money, false, false)
  expect(amount).toEqual('0.00010000 ₿')
})

it('formats metal', () => {
  const money : Money = {
    cents: 10,
    currency: {
      id: "XAU",
      isoCode: "XAU",
      name: "Gold (Troy Ounce)",
      subunitToUnit: 100,
      symbol: "oz t"
    }
  }
  const amount = formatMoney(money, false, false)
  expect(amount).toEqual('0.10 oz t')
})