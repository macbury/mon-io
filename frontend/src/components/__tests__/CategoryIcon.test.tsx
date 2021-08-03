import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import CategoryIcon, { ICategoryIconProp } from '../CategoryIcon'

it('renders full version', () => {
  const props : ICategoryIconProp = {
    color: '#fff',
    name: 'repeat',
    simple: false,
    size: 34
  }

  const component = shallow(<CategoryIcon {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('renders simple version', () => {
  const props : ICategoryIconProp = {
    color: '#ddd',
    name: 'users',
    simple: true,
    size: 24
  }

  const component = shallow(<CategoryIcon {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})