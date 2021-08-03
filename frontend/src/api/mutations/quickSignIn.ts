import gql from 'graphql-tag'

export default gql`
  mutation quickSignIn($input: QuickSignInInput!) {
    quickSignIn(input: $input) {
      refreshToken {
        token
        id
      }
      errors
    }
  }
`