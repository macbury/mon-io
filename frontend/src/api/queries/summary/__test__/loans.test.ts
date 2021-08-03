import query from '../loans'

it('should match query', () => {
  expect(query).toMatchGraphqlSchema()
})