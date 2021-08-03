import gql from 'graphql-tag'
import ViewCurrency from '../fragments/ViewCurrency'

export default gql`
  ${ViewCurrency}

  fragment Amount on Money {
    cents
        
    currency {
      ...ViewCurrency
    }
  }

  query getCurrentBalance($categoryId: ID!) {
    balance(categoryId: $categoryId) {
      category {
        id
        name
        icon
        color
      }

      today {
        value {
          ...Amount
        }

        exchangedValue {
          ...Amount
        }

        month
      }
    }
  }
`