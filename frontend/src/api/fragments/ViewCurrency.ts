import gql from 'graphql-tag'

export default gql`
  fragment ViewCurrency on Currency {
    id
    name
    symbol
    isoCode
    subunitToUnit
  }
`