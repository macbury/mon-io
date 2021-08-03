import React from 'react'
import { Text } from 'react-native'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import ILinkProps from '../props'
import Link from '../index.web'
import { homePath, settingsPath } from '../../../helpers/urls'

it('renders correctly', () => {
  const props : ILinkProps = {
    action: homePath(),
  }

  const component = shallow(
    <Link {...props}>
      <Text>Hello world!</Text>
    </Link>
  )

  expect(snapshot(component)).toMatchSnapshot()
})

it('renders growing link', () => {
  const props : ILinkProps = {
    action: settingsPath(),
    grow: true,
    ripple: true
  }

  const component = shallow(
    <Link {...props}>
      <Text>Hello world!</Text>
    </Link>
  )

  expect(snapshot(component)).toMatchSnapshot()
})