import gql from 'graphql-tag'

export default gql`
  mutation destroyTransaction($input: DestroyTransactionInput!) {
    destroyTransaction(input: $input) {
      clientMutationId
    }
  }
`