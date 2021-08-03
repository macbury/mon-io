import gql from 'graphql-tag'
import ViewCategory from '../../fragments/ViewCategory'
import ViewCurrency from '../../fragments/ViewCurrency'

export default gql`
  query getNextMonth($date: TimeArgument!) {
    summary(date: $date) {
      nextMonth {
        id
        amount {
          cents
          currency {
            ...ViewCurrency
          }
        }
        category {
          ...ViewCategory
        }
      }
    }
  }
  ${ViewCategory}
  ${ViewCurrency}
`