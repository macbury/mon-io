import gql from 'graphql-tag'

export default gql`
  mutation updateRecurrence($input: UpdateRecurrenceInput!){
    updateRecurrence(input: $input) {
      clientMutationId
      errors
    }
  }
`