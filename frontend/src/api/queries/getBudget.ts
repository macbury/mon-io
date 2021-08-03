import gql from 'graphql-tag'
import ViewCategory from '../fragments/ViewCategory'
import ViewCurrency from '../fragments/ViewCurrency'

export default gql`
  ${ViewCategory}
  ${ViewCurrency}

  fragment Amount on Money {
    cents
    currency {
      ...ViewCurrency
    }
  }

  fragment ViewCategoryBudget on CategoryBudget {
    id
    kind
    category {
      ...ViewCategory
    }

    executed

    available {
      cents
      currency {
        ...ViewCurrency
      }
    }

    exchangedPlanned {
      ...Amount
    }

    planned {
      ...Amount
    }

    exchangedSpend {
      ...Amount
    }

    spend {
      ...Amount
    }
  }

  query getBudget($id: TimeArgument!) {
    getBudget(id: $id) {
      id

      date
      start
      stop

      missingCategories {
        ...ViewCategoryBudget
      }

      categories {
        ...ViewCategoryBudget
      }

      sharedCategories {
        ...ViewCategoryBudget
        user {
          username
          avatarUrl
          id
        }
      }
    }
  }
`