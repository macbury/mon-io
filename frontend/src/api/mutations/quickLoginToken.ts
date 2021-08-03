import gql from 'graphql-tag'

export default gql`
  mutation quickLoginToken($input: QuickLoginTokenInput!) {
    quickLoginToken(input: $input) {
      token
    }
  }
`