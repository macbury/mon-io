import incomeExpenseQuery from '../incomeExpense'

it('should match query', () => {
  expect(incomeExpenseQuery).toMatchGraphqlSchema()
})