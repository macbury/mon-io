import gql from 'graphql-tag'

export default gql`
  mutation refreshAccessToken($refreshToken: String!) {
    refreshAccessToken(input: { refreshToken: $refreshToken }) {
      errors
      accessToken
    }
  }
`