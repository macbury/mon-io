import gql from 'graphql-tag'
import ViewCategory from '../../fragments/ViewCategory'
import ViewCurrency from '../../fragments/ViewCurrency'

export default gql`
  ${ViewCategory}
  ${ViewCurrency}

  fragment Amount on Money {
    cents
    currency {
      ...ViewCurrency
    }
  }

  query getCategoriesSummary($date: TimeArgument!, $filter: TransactionCategoryKind!) {
    summary(date: $date) {
      date
      categories(filter: $filter) {
        id
        amount {
          ...Amount
        }
        positive {
          ...Amount
        }
        negative {
          ...Amount
        }
        category {
          ...ViewCategory
        }
      }
    }
  }
`