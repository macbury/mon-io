import gql from 'graphql-tag'

export default gql`
  mutation createRecurrence($input: CreateRecurrenceInput!){
    createRecurrence(input: $input) {
      clientMutationId
      errors
      series {
        id
      }
    }
  }
`