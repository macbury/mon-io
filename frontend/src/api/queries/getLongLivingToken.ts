import gql from 'graphql-tag'

export default gql`
  query getLongLivingToken($id: ID!) {
    getLongLivingToken(id: $id)
  }
`