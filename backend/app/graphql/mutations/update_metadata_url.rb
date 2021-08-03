module Mutations
  class UpdateMetadataUrl < Types::BaseMutation
    use Favicon::CreateForTransaction, as: :create_link_for_favicon

    null true
    argument :transaction_id, ID, required: true
    argument :url, String, required: false

    field :transaction, Types::TransactionType, null: true
    field :errors, [String], null: false

    def resolve(transaction_id:, url: nil)
      transaction = Transaction.shared_or_for_user(current_user).find(transaction_id)

      create_link_for_favicon(
        url: url,
        transaction: transaction
      )

      {
        transaction: transaction,
        errors: []
      }
    end
  end
end
