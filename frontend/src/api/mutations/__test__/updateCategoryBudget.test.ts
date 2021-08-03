import updateCategoryBudgetMutation from '../updateCategoryBudget'

it('should match query', () => {
  expect(updateCategoryBudgetMutation).toMatchGraphqlSchema()
})