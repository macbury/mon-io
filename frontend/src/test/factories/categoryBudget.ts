import * as Factory from 'factory.ts'
import { CategoryBudget } from '../../api/graphql'
import { money } from './money'
import { category } from './category'
import { user } from './user'

export const categoryBudget = Factory.Sync.makeFactory<CategoryBudget>({
  id: Factory.Sync.each((seq) => seq + '-57f0-488e-acd2-4880bff86630'),
  spend: money.build({ cents: 100 as any }),
  exchangedSpend: money.build({ cents: 100 as any }),
  planned: money.build({ cents: 100 as any }),
  exchangedPlanned: money.build({ cents: 100 as any }),
  available: money.build({ cents: 100 as any }),
  category: category.build(),
  transactions: Factory.Sync.each(() => []),
  executed: 3,
  user: user.build() as any,
  kind: null,
})
