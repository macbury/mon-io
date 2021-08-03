import { Transaction } from '../../api/graphql'

export interface IListProps {
  getItem(index : number) : Transaction
  fetchPagesByIndexes(startIndex : number, endIndex : number)
  totalCount : number
  paginationKey : string
}