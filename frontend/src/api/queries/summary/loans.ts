import gql from 'graphql-tag'
import ViewCurrency from '../../fragments/ViewCurrency'

export default gql`
  fragment AmountView on Money {
    cents
    currency {
      ...ViewCurrency
    }
  }

  query getSummaryLoans($date: TimeArgument!) {
    summary(date: $date) {
      date

      loans {
        ...AmountView
      }
    }
  }

  ${ViewCurrency}
`