import gql from 'graphql-tag'

export default gql`
  query getTransactionsReport(
    $query : String,
    $month : TimeArgument,
    $filter: TransactionCategoryKind,
    $order: TransactionOrder,
    $categoryIds: [ID!],
    $toDate: TimeArgument,
    $fromDate: TimeArgument
  ) {
    transactions(
      month: $month,
      filter: $filter,
      order: $order,
      query: $query,
      categoryIds: $categoryIds,
      toDate: $toDate,
      fromDate: $fromDate
    ) {
      totalCount
      report {
        list {
          url
          filename
          id
        }
      }
    }
  }
`