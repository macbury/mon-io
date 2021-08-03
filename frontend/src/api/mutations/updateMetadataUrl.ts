import gql from 'graphql-tag'

export default gql`
  mutation updateMetadataUrl($input: UpdateMetadataUrlInput!) {
    updateMetadataUrl(input: $input) {
      errors
      transaction {
        id
      }
    }
  }
`