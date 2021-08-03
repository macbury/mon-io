import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { category } from '../../../test/factories/category'
import { currency } from '../../../test/factories/currency'

import CategoryOption, { ICategoryOptionProps } from '../CategoryOption'

it('renders', () => {
  const props : ICategoryOptionProps = {
    category: category.build(),
    onCategoryPress: () => ({}),
    width: 60,
    spend: {
      cents: 0,
      currency: currency.build()
    }
  }

  const component = shallow(<CategoryOption {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})