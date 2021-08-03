module Resolvers
  class GetImport < Base
    include SearchObject.module(:graphql)

    scope { context[:current_user].imports }

    type Types::ImportType, null: true

    option(:id, type: ID, required: true) { |scope, value| scope.find(value) }
  end
end