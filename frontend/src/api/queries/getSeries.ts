import gql from 'graphql-tag'

import ViewSeries from '../fragments/ViewSeries'
import ViewCategory from '../fragments/ViewCategory'
import ViewLocation from '../fragments/ViewLocation'
import ViewCurrency from '../fragments/ViewCurrency'

export default gql`
  ${ViewSeries}
  ${ViewCategory}
  ${ViewCurrency}
  ${ViewLocation}

  query getSeries($id: ID!) {
    getSeries(id: $id) {
      ...ViewSeries
      endAt

      blueprint {
        id
        notes
        kind

        link {
          id
          url
        }

        category {
          ...ViewCategory
        }

        location {
          ...ViewLocation
        }

        amount {
          cents
          currency {
            ...ViewCurrency
          }
        }
      }
    }
  }
`