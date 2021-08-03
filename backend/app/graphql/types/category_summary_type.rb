module Types
  class CategorySummaryType < BaseObject
    field :id, ID, null: false
    field :category, CategoryType, null: false
    field :amount, MoneyType, null: false
    field :positive, MoneyType, null: false
    field :negative, MoneyType, null: false

    def id
      object[:category].id
    end

    def amount
      object[:positive] + object[:negative]
    end
  end
end
