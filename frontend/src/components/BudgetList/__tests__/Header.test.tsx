import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { TransactionCategoryKind } from '../../../api/graphql'
import { categoryBudget } from '../../../test/factories/categoryBudget'

import Header, { IHeaderProps } from '../Header'

it('renders header with category expense for 10 zl', () => {
  const props : IHeaderProps = {
    type: TransactionCategoryKind.Expense,
    categories: categoryBudget.buildList(10)
  }

  const component = shallow(<Header {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})


it('renders header with category income for 0 zl', () => {
  const props : IHeaderProps = {
    type: TransactionCategoryKind.Income,
    categories: categoryBudget.buildList(10)
  }

  const component = shallow(<Header {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})