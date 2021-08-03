import gql from 'graphql-tag'
import ViewTransaction from '../fragments/ViewTransaction'

export default gql`
  query filter(
    $query : String,
    $month : TimeArgument,
    $filter: TransactionCategoryKind,
    $first: Int,
    $after: String,
    $order: TransactionOrder,
    $categoryIds: [ID!],
    $toDate: TimeArgument,
    $fromDate: TimeArgument,
    $importId: ID,
    $import: TransactionImport,
    $series: TransactionSeries,
    $receipt: TransactionReceipt
  ) {
    transactions(
      month: $month,
      filter: $filter,
      first: $first,
      after: $after,
      order: $order,
      query: $query,
      categoryIds: $categoryIds,
      toDate: $toDate,
      fromDate: $fromDate,
      importId: $importId,
      import: $import,
      series: $series,
      receipt: $receipt
    ) {
      totalCount

      nodes {
        ...ViewTransaction
      }

      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ViewTransaction}
`