import gql from 'graphql-tag'
import ViewReceipt from '../fragments/ViewReceipt'

export default gql`
  query getReceipt($id: ID!) {
    getReceipt(id: $id) {
      ...ViewReceipt
    }
  }
  ${ViewReceipt}
`