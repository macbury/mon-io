import gql from 'graphql-tag'
import ViewImport from '../fragments/ViewImport'

export default gql`
  query getImport($id: ID!, $encoding: String) {
    ${ViewImport}
    getImport(id: $id) {
      ...ViewImport
      fromLine
      toLine
      delimiter
      encoding
      notesColumn
      amountColumn
      dateColumn

      content(encoding: $encoding)
    }
  }
`