import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { categoryBudget } from '../../../test/factories/categoryBudget'

import CategoryBudget, { ICategoryBudgetProps } from '../CategoryBudget'

it('renders', () => {
  const props : ICategoryBudgetProps = {
    budgetId: 'id of budget',
    option: {
      category: categoryBudget.build()
    }
  }

  const component = shallow(<CategoryBudget {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})