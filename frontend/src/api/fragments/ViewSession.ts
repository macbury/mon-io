import gql from 'graphql-tag'

export default gql`
  fragment ViewSession on Session {
    id
    ip
    name
    createdAt
  }
`