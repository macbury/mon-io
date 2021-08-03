import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'

import FullPageLoader from '../FullPageLoader'

it('renders correctly', () => {
  const component = shallow(<FullPageLoader />)
  expect(snapshot(component)).toMatchSnapshot()
})