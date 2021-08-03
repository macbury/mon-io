import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import AppBarTab, { IAppBarTab } from '../AppBarTab'
import { homePath } from '../../helpers/urls'

it('renders correctly', () => {
  const props : IAppBarTab = {
    action: homePath(),
    icon: 'repeat',
    current: false
  }

  const component = shallow(<AppBarTab {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})