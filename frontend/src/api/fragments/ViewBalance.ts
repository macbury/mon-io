import gql from 'graphql-tag'
import ViewCurrency from './ViewCurrency'

export default gql`
  ${ViewCurrency}
  ${ViewCurrency}

  fragment Amount on Money {
    cents
        
    currency {
      ...ViewCurrency
    }
  }

  fragment ViewBalance on Balance {
    category {
      id
      name
      icon
      color
    }

    history {
      exchangedValue {
        ...Amount
      }

      month
    }
  }
`