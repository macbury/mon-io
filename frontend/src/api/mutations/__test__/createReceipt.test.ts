import createReceiptMutation from '../createReceipt'

it('should match query', () => {
  expect(createReceiptMutation).toMatchGraphqlSchema()
})