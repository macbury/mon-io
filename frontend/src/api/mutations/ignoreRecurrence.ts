import gql from 'graphql-tag'

export default gql`
  mutation ignoreRecurrence($input: IgnoreRecurrenceInput!) {
    ignoreRecurrence(input: $input) {
      errors
      series {
        id
      }
    }
  }
`