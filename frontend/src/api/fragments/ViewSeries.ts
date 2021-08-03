import gql from 'graphql-tag'

export default gql`
  fragment ViewSeries on Series {
    id
    recurrence
  }
`