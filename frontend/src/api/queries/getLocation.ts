import gql from 'graphql-tag'
import ViewLocation from '../fragments/ViewLocation'

export default gql`
  query getLocation($location: LocationInput!) {
    getLocation(location: $location) {
      ...ViewLocation
    }
  }
  ${ViewLocation}
`