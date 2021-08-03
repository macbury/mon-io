import updateReceiptMutation from '../updateReceipt'

it('should match query', () => {
  expect(updateReceiptMutation).toMatchGraphqlSchema()
})