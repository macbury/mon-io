module Types
  class CategoryBudgetType < BaseObject
    field :id, ID, null: false
    field :kind, TransactionKindEnum, null: false
    field :category, CategoryType, null: false
    field :planned, MoneyType, null: false
    field :exchanged_planned, MoneyType, null: false, description: 'Spend value but in system currency'
    field :spend, MoneyType, null: false
    field :exchanged_spend, MoneyType, null: false, description: 'Spend value but in system currency'
    field :available, MoneyType, null: false
    field :executed, Float, null: false
    field :transactions, [TransactionType], null: false

    field :user, ProfileType, null: false

    def id
      object.category_id
    end

    def user
      object.budget_period.user
    end
  end
end
