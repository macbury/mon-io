module Mutations
  class UpdateReceipt < Types::BaseMutation
    null true

    argument :id, ID, required: true
    argument :category_id, ID, required: false

    field :receipt, Types::ReceiptType, null: true
    field :errors, [String], null: false

    def resolve(category_id: nil, id:)
      receipt = context[:current_user].receipts.find(id)

      receipt.update(
        category_id: category_id
      )

      {
        receipt: receipt,
        errors: []
      }
    end
  end
end