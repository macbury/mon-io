import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment-timezone'
import snapshot from 'enzyme-to-json'

jest.mock('../../../assets/art-dark.png', () => {})

import { categoryBudget } from '../../../test/factories/categoryBudget'
import CategorySummary from '../CategorySummary'

it('renders correctly', () => {
  const props = {
    categoryBudget: categoryBudget.build(),
    date: moment('2019-01-02 12:33')
  }

  const component = shallow(<CategorySummary {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})
