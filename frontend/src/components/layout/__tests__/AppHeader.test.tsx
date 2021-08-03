import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'

import AppHeader from '../AppHeader'

it('renders correctly', () => {
  const props = {
    theme: {
      colors: {
        text: '#000'
      }
    },
    navigation: {
      state: {
        routes: []
      }
    },
    scene: {
      descriptor: {
        options: {
          headerTitle: 'New header title'
        }
      }
    }
  }

  const component = shallow(<AppHeader {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})