import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'enzyme-to-json'
import { homePath } from '../../../helpers/urls'
import Item, { IItemProps } from '../Item'
import { ThemeProvider } from 'styled-components/native'

jest.mock('react-navigation-hooks', () => ({
  useNavigation: jest.fn()
}))

it('renders', () => {
  const props : IItemProps = {
    icon: 'settings',
    titleKey: 'pages.series.title',
    action: homePath()
  }

  const component = shallow(
    <ThemeProvider theme={{} as any}>
      <Item {...props}/>
    </ThemeProvider>
  )
  expect(snapshot(component)).toMatchSnapshot()
})