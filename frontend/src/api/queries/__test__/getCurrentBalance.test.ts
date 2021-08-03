import query from '../getCurrentBalance'

it('should match query', () => {
  expect(query).toMatchGraphqlSchema()
})