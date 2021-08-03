import getSessionsQuery from '../getSessions'

it('should match query', () => {
  expect(getSessionsQuery).toMatchGraphqlSchema()
})