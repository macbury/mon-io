import gql from 'graphql-tag'
import ViewCategory from './ViewCategory'
import ViewLocation from './ViewLocation'

export default gql`
  ${ViewCategory}
  ${ViewLocation}
  fragment ViewReceipt on Receipt {
    id
    fileUrl
    name
    mimeType
    createdAt
    attached
    location {
      ...ViewLocation
    }
    category {
      ...ViewCategory
    }
  }
`