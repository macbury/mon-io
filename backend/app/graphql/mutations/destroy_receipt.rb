module Mutations
  class DestroyReceipt < Types::BaseMutation
    null true

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      receipt = current_user.receipts.find(id)

      {
        success: receipt.destroy
      }
    end
  end
end