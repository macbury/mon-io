module Types
  class MoneyType < Types::BaseObject
    field :cents, Integer, null: false
    field :currency, CurrencyType, null: false
    field :formatted, String, null: true
    field :amount, Float, null: true

    def formatted
      object.format
    end

    def amount
      object.to_s.to_f
    end
  end
end
