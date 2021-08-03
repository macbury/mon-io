import gql from 'graphql-tag'
import ViewSession from '../fragments/ViewSession'

export default gql`
  mutation createLongLivingToken($input: CreateLongLivingTokenInput!) {
    ${ViewSession}

    createLongLivingToken(input: $input) {
      refreshToken {
        ...ViewSession
      }
      errors
    }
  }
`