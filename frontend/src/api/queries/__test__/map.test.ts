import getMap from '../map'

it('should match query', () => {
  expect(getMap).toMatchGraphqlSchema()
})