module Types
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :color, String, null: false
    field :kind, Types::TransactionKindEnum, null: false
    field :kind_by_amount, Types::KindByAmountType, null: false, description: 'Maps value to proper kind for this category, for example is nagative amount diffrent kind?'
    field :icon, String, null: false
    field :shared, Boolean, null: true
    field :archived, Boolean, null: true

    field :system, Boolean, null: false
    field :currency, CurrencyType, null: false

    def system
      object.system?
    end
  end
end
