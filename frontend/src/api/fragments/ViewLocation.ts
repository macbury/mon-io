import gql from 'graphql-tag'

export default gql`
  fragment ViewLocation on Location {
    id
    name
    city
    country
    lat
    lng
    postcode
  }
`