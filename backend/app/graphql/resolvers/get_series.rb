module Resolvers
  class GetSeries < Base
    include SearchObject.module(:graphql)

    scope { context[:current_user].series }

    type Types::SeriesType, null: true
    option(:id, type: ID, required: true) { |scope, value| scope.find(value) }
  end
end