import nextMonthQuery from '../nextMonth'
import { validateQuery } from '../../../../test/graphql'

it('should match query', () => {
  expect(validateQuery(nextMonthQuery)).toEqual([])
})