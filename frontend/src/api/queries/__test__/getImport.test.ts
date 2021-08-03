import query from '../getImport'

it('should match query', () => {
  expect(query).toMatchGraphqlSchema()
})