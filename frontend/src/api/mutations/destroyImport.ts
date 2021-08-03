import gql from 'graphql-tag'

export default gql`
  mutation destroyImport($input: DestroyImportInput!) {
    destroyImport(input: $input) {
      clientMutationId
      success
    }
  }
`