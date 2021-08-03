import gql from 'graphql-tag'
import ViewCategory from '../fragments/ViewCategory'

export default gql`
  ${ViewCategory}

  fragment ViewImport on Import {
    id
    name
    mimeType
    fileUrl
    createdAt
    category {
      ...ViewCategory
    }
  }
`