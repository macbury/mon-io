import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { newPlannedTransactionPath } from '../../../helpers/urls'
import { series as seriesBuilder } from '../../../test/factories/series'

import PlannedTransactionItem, { IPlannedTransactionItemProps } from '../index'

it('renders correctly', () => {
  const series = seriesBuilder.build()

  const props : IPlannedTransactionItemProps = {
    action: newPlannedTransactionPath('seriesId', 'isoDate'),
    series,
    onActionsShow: jest.fn(),
    plannedTransaction: series.blueprint as any
  }

  const component = shallow(<PlannedTransactionItem {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})