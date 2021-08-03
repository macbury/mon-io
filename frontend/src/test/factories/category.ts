import * as Factory from 'factory.ts'
import { Category, TransactionCategoryKind } from '../../api/graphql'
import { currency } from './currency'

export const category = Factory.Sync.makeFactory<Category>({
  id: Factory.Sync.each((seq) => seq + '-57f0-488e-acd2-4880bff86630'),
  name: 'Category',
  icon: 'MaterialIcons:repeat',
  color: '#fff',
  kind: TransactionCategoryKind.Expense,
  system: true,
  currency: Factory.Sync.each(() => currency.build()),
  kindByAmount: {
    negative: TransactionCategoryKind.Expense,
    positive: TransactionCategoryKind.Expense,
  }
})
