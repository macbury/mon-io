import { PlannedTransaction, Transaction, Series } from '../../api/graphql'

export type SeriesTransaction = PlannedTransaction | Transaction

export type onActionsShow = (series : Series, transaction : SeriesTransaction) => void
