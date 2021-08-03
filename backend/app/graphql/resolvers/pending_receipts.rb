module Resolvers
  class PendingReceipts < Base
    include SearchObject.module(:graphql)

    scope { context[:current_user].receipts.pending.lazy_preload(:category, :location).order('receipts.created_at ASC') }

    type Types::ReceiptType.connection_type, null: false
  end
end