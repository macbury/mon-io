import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import ActionDialog, { IActionDialogProps } from '../ActionDialog'

it('renders correctly', () => {
  const props : IActionDialogProps = {
    visible: true,
    title: 'Dialog title',
    onDismiss: jest.fn(),
    items: [
      {
        title: 'First item',
        icon: 'repeat',
        onPress: jest.fn(),
        subtitle: 'Subtitle'
      },

      {
        title: 'Second item',
        icon: 'repeat',
        onPress: jest.fn(),
        subtitle: 'Subtitle'
      }
    ]
  }

  const component = shallow(<ActionDialog {...props}/>)
  expect(snapshot(component)).toMatchSnapshot()
})