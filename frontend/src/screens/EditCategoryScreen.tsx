import React, { useEffect } from 'react'
import { useIsFocused } from 'react-navigation-hooks'
import { useStoreData } from '../stores'
import CategoryForm from '../components/CategoryForm'

function useEditCategory() {
  return useStoreData(({ screens: { editCategory } }) => ({
    load: editCategory.load,
    clear: editCategory.clear,
  }))
}

function EditCategoryScreen({ navigation }) {
  const {
    load,
    clear
  } = useEditCategory()

  const isFocused = useIsFocused()
  const categoryIdParam = navigation.getParam('categoryId')

  useEffect(() => {
    if (isFocused) {
      load(categoryIdParam)
    }
    return () => clear()
  }, [clear, load, categoryIdParam, isFocused])

  return <CategoryForm />
}

// @ts-ignore
EditCategoryScreen.navigationOptions = props => ({
  title: 'pages.edit_category.title'
})


export default EditCategoryScreen