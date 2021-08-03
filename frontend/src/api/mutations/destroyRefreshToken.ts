import gql from 'graphql-tag'

export default gql`
  mutation destroyRefreshToken($input: DestroyRefreshTokenInput!) {
    destroyRefreshToken(input: $input) {
      success
    }
  }
`