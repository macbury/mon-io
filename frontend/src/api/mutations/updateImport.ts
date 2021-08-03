import gql from 'graphql-tag'

export default gql`
  mutation updateImport($input: UpdateImportInput!) {
    updateImport(input: $input) {
      import {
        id
        transactionCount
      }
      errors
    }
  }
`