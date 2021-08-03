import gql from 'graphql-tag'
import ViewCategory from '../fragments/ViewCategory'

export default gql`
  mutation updateCategory($input: UpdateCategoryInput!) {
    ${ViewCategory}

    updateCategory(input: $input) {
      errors
      category {
        ...ViewCategory
      }
    }
  }
`