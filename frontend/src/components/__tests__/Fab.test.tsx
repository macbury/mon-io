import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'

import Fab from '../Fab'

it('renders correctly', () => {
  const props = {
    icon: "add",
    onPress: () => console.log('Yolo') 
  }

  const component = shallow(<Fab {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})