import gql from 'graphql-tag'
import ViewCurrency from '../fragments/ViewCurrency'
import ViewCategory from '../fragments/ViewCategory'

export default gql`
  ${ViewCategory}
  ${ViewCurrency}

  mutation updateCategoryBudget($input : UpdateCategoryBudgetInput!) {
    updateCategoryBudget(input : $input) {
      errors
      categoryBudget {
        id
        category {
          ...ViewCategory
        }

        executed
        planned {
          cents
          currency {
            ...ViewCurrency
          }
        }

        spend {
          cents
          currency {
            ...ViewCurrency
          }
        }
      }
    }
  }
`