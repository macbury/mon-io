module Mutations
  class DestroyTransaction < Types::BaseMutation
    null true

    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      transaction = Transaction.shared_or_for_user(context[:current_user]).find(id)

      {
        success: transaction.destroy
      }
    end
  end
end