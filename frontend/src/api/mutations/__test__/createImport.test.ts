import mutation from '../createImport'

it('should match query', () => {
  expect(mutation).toMatchGraphqlSchema()
})