import pendingReceiptsQuery from '../pendingReceipts'
import { validateQuery } from '../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(pendingReceiptsQuery)).toEqual([])
})