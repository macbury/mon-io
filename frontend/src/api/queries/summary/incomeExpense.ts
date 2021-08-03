import gql from 'graphql-tag'
import ViewCurrency from '../../fragments/ViewCurrency'

export default gql`
  fragment AmountView on Money {
    cents
    currency {
      ...ViewCurrency
    }
  }

  fragment SummaryView on Summary {
    date

    expense {
      ...AmountView
    }
    income {
      ...AmountView
    }
    difference {
      ...AmountView
    }
  }

  query getIncomeExpenseStatistics($date: TimeArgument!) {
    summary(date: $date) {
      ...SummaryView
    }
  }

  ${ViewCurrency}
`