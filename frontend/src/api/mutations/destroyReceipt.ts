import gql from 'graphql-tag'

export default gql`
  mutation destroyReceipt($input: DestroyReceiptInput!) {
    destroyReceipt(input: $input) {
      clientMutationId
    }
  }
`