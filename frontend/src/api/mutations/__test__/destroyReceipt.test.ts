import destroyReceiptMutation from '../destroyReceipt'

it('should match query', () => {
  expect(destroyReceiptMutation).toMatchGraphqlSchema()
})