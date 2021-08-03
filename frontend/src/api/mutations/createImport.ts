import gql from 'graphql-tag'

export default gql`
  mutation createImport($input: CreateImportInput!) {
    createImport(input: $input) {
      errors
      import {
        id
      }
    }
  }
`