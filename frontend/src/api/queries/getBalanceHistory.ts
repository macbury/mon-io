import gql from 'graphql-tag'
import ViewBalance from '../fragments/ViewBalance'

export default gql`
  ${ViewBalance}

  query getBalanceHistory($categoryId: ID!, $aggregation: Aggregation) {
    balance(categoryId: $categoryId, aggregation: $aggregation) {
      ...ViewBalance
    }
  }
`