import gql from 'graphql-tag'

export default gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      refreshToken {
        id
        token
      }
      errors
    }
  }
`