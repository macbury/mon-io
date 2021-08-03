import * as Factory from 'factory.ts'
import { Transaction, TransactionCategoryKind, Recurrence } from '../../api/graphql'
import { money } from './money'
import { user } from './user'
import { category } from './category'
import { location } from './location'

export const transaction = Factory.Sync.makeFactory<Transaction>({
  id: Factory.Sync.each((seq) => seq + '-57f0-488e-acd2-4880bff86630'),

  amount: money.build(),
  exchangedAmount: money.build(),
  author: user.build(),
  category: category.build(),
  createdAt: '2020-01-12 19:30',
  date: '2020-01-12',
  kind: TransactionCategoryKind.Expense,
  lat: 10,
  lng: 11,
  notes: 'random transaction',
  recurrence: Recurrence.None,
  location: location.build()
})
