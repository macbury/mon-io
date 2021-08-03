import gql from 'graphql-tag'
import ViewReceipt from '../fragments/ViewReceipt'

export default gql`
  query pendingReceipts {
    pendingReceipts {
      nodes {
        ...ViewReceipt
      }
    }
  }
  ${ViewReceipt}
`