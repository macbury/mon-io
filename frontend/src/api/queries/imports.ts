import gql from 'graphql-tag'
import ViewImport from '../fragments/ViewImport'

export default gql`
  query imports($state: ImportStateEnum) {
    ${ViewImport}

    imports(state: $state) {
      nodes {
        ...ViewImport
      }
    }
  }
`