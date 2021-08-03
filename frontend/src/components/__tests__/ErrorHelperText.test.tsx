import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'

import ErrorHelperText from '../ErrorHeplerText'

it('renders graphQLError and errors correctly', () => {
  const props = {
    error: new Error('Graphql nasty error'),
  }

  const component = shallow(<ErrorHelperText {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})

it('renders nothing correctly', () => {
  const props = { }

  const component = shallow(<ErrorHelperText {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})