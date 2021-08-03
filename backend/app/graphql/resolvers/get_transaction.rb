module Resolvers
  class GetTransaction < Base
    include SearchObject.module(:graphql)

    scope { Transaction.shared_or_for_user(context[:current_user]).is_not_blueprint }

    type Types::TransactionType, null: true
    option(:id, type: ID, required: true) { |scope, value| scope.find(value) }
  end
end