import gql from 'graphql-tag'
import ViewReceipt from '../fragments/ViewReceipt'

export default gql`
  mutation createReceipt($input: CreateReceiptInput!) {
    createReceipt(input: $input) {
      errors
      receipt {
        ...ViewReceipt
      }
    }
  }
  ${ViewReceipt}
`