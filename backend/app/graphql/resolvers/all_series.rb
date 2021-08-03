module Resolvers
  class AllSeries < Base
    include SearchObject.module(:graphql)

    scope { context[:current_user].series.by_name.by_category }

    type Types::SeriesType.connection_type, null: false
  end
end