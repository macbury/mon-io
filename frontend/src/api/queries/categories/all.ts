import gql from 'graphql-tag'
import ViewCategory from '../../fragments/ViewCategory'

export default gql`
  query allCategories {
    allCategories {
      nodes {
        ...ViewCategory
      }
    }
  }

  ${ViewCategory}
`