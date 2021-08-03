import gql from 'graphql-tag'

export default gql`
  mutation createTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      errors
      transaction {
        id
        createdAt
        receipt {
          id
        }
      }
    }
  }
`