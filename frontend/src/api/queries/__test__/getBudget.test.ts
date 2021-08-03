import getBudgetQuery from '../getBudget'

it('should match query', () => {
  expect(getBudgetQuery).toMatchGraphqlSchema()
})