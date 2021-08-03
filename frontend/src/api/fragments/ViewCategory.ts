import gql from 'graphql-tag'
import ViewCurrency from './ViewCurrency'

export default gql`
  ${ViewCurrency}
  fragment ViewCategory on Category {
    id
    name
    color
    icon
    kind
    system
    shared
    archived
    kindByAmount {
      negative
      positive
    }

    currency {
      ...ViewCurrency
    }
  }
`