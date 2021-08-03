import getLocationQuery from '../getLocation'

it('should match query', () => {
  expect(getLocationQuery).toMatchGraphqlSchema()
})