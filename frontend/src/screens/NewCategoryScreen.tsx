import React, { useEffect } from 'react'
import { useIsFocused } from 'react-navigation-hooks'
import { useStoreData } from '../stores'
import CategoryForm from '../components/CategoryForm'

function useNewCategory() {
  return useStoreData(({ screens: { editCategory } }) => ({
    initialize: editCategory.initialize,
    clear: editCategory.clear
  }))
}

function NewCategoryScreen({ navigation }) {
  const { initialize, clear } = useNewCategory()
  const isFocused = useIsFocused()
  const kind = navigation.getParam('kind')

  useEffect(() => {
    if (isFocused) {
      initialize(kind)
    }
    return () => clear()
  }, [initialize, clear, isFocused, kind])

  return <CategoryForm />
}

// @ts-ignore
NewCategoryScreen.navigationOptions = props => ({
  title: 'pages.new_category.title'
})


export default NewCategoryScreen