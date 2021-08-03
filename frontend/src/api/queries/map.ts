import gql from 'graphql-tag'
import ViewCurrency from '../fragments/ViewCurrency'
import ViewLocation from '../fragments/ViewLocation'

export default gql`
  query map($categoryIds: [ID!]) {
    map(categoryIds: $categoryIds) {
      id
      location {
        ...ViewLocation
      }

      amount {
        cents
        currency {
          ...ViewCurrency
        }
      }
    }
  }

  ${ViewLocation}
  ${ViewCurrency}
`