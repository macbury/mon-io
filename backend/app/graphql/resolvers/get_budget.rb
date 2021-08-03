module Resolvers
  class GetBudget < Base
    include SearchObject.module(:graphql)

    scope { context[:current_user].budget_periods.preload_associations_lazily }

    type Types::BudgetPeriodType, null: true

    option(:id, type: Types::TimeArgument, required: true) { |scope, value| scope.at(value) }
  end
end