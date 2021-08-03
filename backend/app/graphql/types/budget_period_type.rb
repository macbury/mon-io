module Types
  class BudgetPeriodType < Types::BaseObject
    field :id, ID, null: false
    field :date, String, null: false
    field :start, GraphQL::Types::ISO8601DateTime, null: false
    field :stop, GraphQL::Types::ISO8601DateTime, null: false

    field :shared_categories, [CategoryBudgetType], null: false, description: 'What other users planned for this period'
    field :categories, [CategoryBudgetType], null: false, description: 'How much user planned to spend for each category'
    field :missing_categories, [CategoryBudgetType], null: false, description: 'Categories that need to be planned'

    field :balance, MoneyType, null: false
    field :expenses, MoneyType, null: false
    field :loans, MoneyType, null: false
    field :income, MoneyType, null: false
    field :withdraws, MoneyType, null: false
    field :deposits, MoneyType, null: false

    def categories
      object.category_budgets.existing.sort { |a, b| a.category.name <=> b.category.name }
    end

    def missing_categories
      object.missing_category_budgets.sort { |a, b| a.category.name <=> b.category.name }
    end

    def id
      object.date.strftime('%Y-%m')
    end
  end
end
