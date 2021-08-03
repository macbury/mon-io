import gql from 'graphql-tag'
import ViewPlannedTransaction from '../fragments/ViewPlannedTransaction'

export default gql`
  query getPlannedTransactions($month : TimeArgument!, $all: Boolean) {
    plannedTransactions(month: $month, all: $all) {
      ...ViewPlannedTransaction
    }
  }
  ${ViewPlannedTransaction}
`