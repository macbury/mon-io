import gql from 'graphql-tag'
import ViewReceipt from '../fragments/ViewReceipt'

export default gql`
  mutation updateReceipt($input: UpdateReceiptInput!) {
    updateReceipt(input: $input) {
      errors
      receipt {
        ...ViewReceipt
      }
    }
  }
  ${ViewReceipt}
`