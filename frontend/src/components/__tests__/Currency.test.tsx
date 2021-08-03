import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import Currency, { ICurrencyProps } from '../Currency'

import { money } from '../../test/factories/money'

it('renders correctly', () => {
  const props = {
    amount: money.build(),
    size: 32,
    showCurrency: true
  }

  const component = shallow(<Currency {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('renders bitcoin', () => {
  const props = {
    amount: {
      "cents": -230520,
      "currency": {
        "id": "BTC",
        "name": "Bitcoin",
        "symbol":"₿",
        "isoCode":"BTC",
        "subunitToUnit":100000000
      },
      "__typename":"Money"
    },
    size: 32,
    showCurrency: true
  }

  const component = shallow(<Currency {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('do not throw error for empty amount', () => {
  const props = {
    amount: null,
    size: 32,
    showCurrency: true
  }

  const component = shallow(<Currency {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('do not throw error for empty currency', () => {
  const props : ICurrencyProps = {
    amount: {
      cents: 100,
      currency: null
    },
    size: 32,
    showCurrency: true
  }

  const component = shallow(<Currency {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})