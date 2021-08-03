module Mutations
  class UpdateCategoryBudget < Types::BaseMutation
    null true

    argument :kind, Types::TransactionKindEnum, required: true
    argument :budget_period_id, GraphQL::Types::ISO8601DateTime, required: true
    argument :planned, Integer, required: true
    argument :planned_currency, String, required: true
    argument :category_id, ID, required: false

    field :category_budget, Types::CategoryBudgetType, null: true
    field :errors, [String], null: false

    def resolve(budget_period_id:, planned:, planned_currency:, category_id:, kind:)
      ActiveRecord::Base.transaction do
        period = current_user.budget_periods.at(budget_period_id)

        category_budget = period.category_budgets.find_or_initialize_by(category_id: category_id, kind: kind)
        category_budget.assign_attributes(
          planned_cents: planned,
          planned_currency: planned_currency
        )

        category_budget.save!

        {
          category_budget: category_budget,
          errors: []
        }
      end
    end
  end
end