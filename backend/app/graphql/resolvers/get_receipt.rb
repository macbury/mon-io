module Resolvers
  class GetReceipt < Base
    include SearchObject.module(:graphql)

    scope { Receipt }

    type Types::ReceiptType, null: true
    option(:id, type: ID, required: true) { |scope, value| scope.find(value) }
  end
end