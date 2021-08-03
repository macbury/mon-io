import gql from 'graphql-tag'
import ViewTransaction from '../fragments/ViewTransaction'

export default gql`
  query getTransaction($id : ID!) {
    getTransaction(id: $id) {
      ...ViewTransaction
    }
  }
  ${ViewTransaction}
`