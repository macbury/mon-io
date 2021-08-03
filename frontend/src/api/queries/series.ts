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

  query series {
    series {
      nodes {
        ...ViewSeries
        blueprint {
          notes
          kind
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

          exchangedAmount {
            currency {
              ...ViewCurrency
            }
            cents
          }
        }
      }
    }
  }
`