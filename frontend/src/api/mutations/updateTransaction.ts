import gql from 'graphql-tag'

export default gql`
  mutation($input: UpdateTransactionInput!) {
    updateTransaction(input: $input) {
      transaction {
        id
      }
      errors
    }
  }
`