module Mutations
  class UpdateTransaction < Types::BaseMutation
    null true

    argument :id, ID, required: true
    argument :attributes, Types::TransactionAttributesInput, required: true

    field :transaction, Types::TransactionType, null: true
    field :errors, [String], null: false

    def resolve(id:, attributes:)
      ActiveRecord::Base.transaction do
        transaction = Transaction.shared_or_for_user(current_user).find(id)
        receipt = current_user.receipts.find_by(id: attributes.receipt_id)

        transaction.update!(attributes.to_h.except(:receipt_id, :url).select { |_k, v| v.present? })

        transaction.receipt&.update!(transaction_id: nil)
        receipt&.reload&.update!(transaction_id: transaction.id)

        {
          transaction: transaction,
          errors: []
        }
      end
    end
  end
end