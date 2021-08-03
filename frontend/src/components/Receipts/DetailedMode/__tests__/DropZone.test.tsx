import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'

import DropZone from '../DropZone'

it('renders correctly', () => {
  const component = shallow(<DropZone onFileSelect={jest.fn()}>Hello world</DropZone>)
  expect(snapshot(component)).toMatchSnapshot()
})