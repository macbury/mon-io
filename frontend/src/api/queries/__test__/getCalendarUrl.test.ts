import getCalendarUrlQuery from '../getCalendarUrl'

it('should match query', () => {
  expect(getCalendarUrlQuery).toMatchGraphqlSchema()
})