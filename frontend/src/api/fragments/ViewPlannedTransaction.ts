import gql from 'graphql-tag'
import ViewCategory from './ViewCategory'
import ViewLocation from './ViewLocation'
import ViewCurrency from './ViewCurrency'
import ViewSeries from '../fragments/ViewSeries'

export default gql`
  ${ViewCategory}
  ${ViewLocation}
  ${ViewCurrency}
  ${ViewSeries}

  fragment ViewPlannedTransaction on PlannedTransaction {
    id
    date
    notes
    recurrence

    series {
      ...ViewSeries
    }

    location {
      ...ViewLocation
    }
    category {
      ...ViewCategory
    }

    amount {
      cents
      currency {
        ...ViewCurrency
      }
    }
  }
`