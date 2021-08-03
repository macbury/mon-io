import aboutQuery from '../about'

it('should match query', () => {
  expect(aboutQuery).toMatchGraphqlSchema()
})