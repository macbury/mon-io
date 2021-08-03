import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import Icon from '../Icon'

jest.mock('styled-components/native', () => ({
  useTheme: () => ({
    
  })
}))

it('renders correctly', () => {
  const props = {
    name: 'MaterialIcons:repeat',
    size: 32,
    color: '#fff'
  }

  const component = shallow(<Icon {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})