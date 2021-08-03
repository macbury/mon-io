import getReceiptQuery from '../getReceipt'

it('should match query', () => {
  expect(getReceiptQuery).toMatchGraphqlSchema()
})