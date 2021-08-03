import React from 'react'
import { mount } from 'enzyme'
import { category } from '../../../test/factories/category'

import AddCategories, { IAddCategoriesProps } from '../AddCategories'
import CategoryOption from '../CategoryOption'

jest.mock('styled-components/native', () => ({
  useTheme: () => ({
    
  })
}));

it('renders', () => {
  const props : IAddCategoriesProps = {
    onCategoryPress: () => null,
    categories: category.buildList(10)
  }

  //const component = mount(<AddCategories {...props}/>)
  //expect(component.find(CategoryOption).length).toBe(10)
})