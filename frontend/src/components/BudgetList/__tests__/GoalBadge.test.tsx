import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { TransactionCategoryKind } from '../../../api/graphql'
import { money } from '../../../test/factories/money'

import GoalBadge, { IGoalBadgeProps } from '../GoalBadge'

it('renders expense with class', () => {
  const props : IGoalBadgeProps = {
    type: TransactionCategoryKind.Expense,
    amount: money.build({ cents: 890 })
  }

  const component = shallow(<GoalBadge {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('renders income with class', () => {
  const props : IGoalBadgeProps = {
    type: TransactionCategoryKind.Income,
    amount: money.build({ cents: 230 })
  }

  const component = shallow(<GoalBadge {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('renders below goal', () => {
  const props : IGoalBadgeProps = {
    type: TransactionCategoryKind.Income,
    amount: money.build({ cents: -230 })
  }

  const component = shallow(<GoalBadge {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})