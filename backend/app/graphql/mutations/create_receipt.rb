module Mutations
  class CreateReceipt < Types::BaseMutation
    use Categories::Suggest, as: :suggest_category
    null true

    argument :category_id, ID, required: false
    argument :file, ApolloUploadServer::Upload, required: true
    argument :location, Types::LocationInput, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false

    field :receipt, Types::ReceiptType, null: true
    field :errors, [String], null: false

    def resolve(category_id: nil, file:, location: {}, created_at: nil)
      ActiveRecord::Base.transaction do
        receipt = context[:current_user].receipts.build(
          category_id: category_id,
          file: file,
          created_at: created_at
        )

        if location
          receipt.assign_attributes(
            lat: location[:lat],
            lng: location[:lng]
          )
        end

        receipt.save!
        receipt.file_derivatives!

        suggest_category(receipt)

        {
          receipt: receipt,
          errors: []
        }
      end
    end
  end
end