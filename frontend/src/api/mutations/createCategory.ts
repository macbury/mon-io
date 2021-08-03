import gql from 'graphql-tag'
import ViewCategory from '../fragments/ViewCategory'

export default gql`
  mutation createCategory($input: CreateCategoryInput!) {
    ${ViewCategory}

    createCategory(input: $input) {
      errors
      category {
        ...ViewCategory
      }
    }
  }
`