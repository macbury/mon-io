module Types
  class KindByAmountType < Types::BaseObject
    field :negative, Types::TransactionKindEnum, null: false
    field :positive, Types::TransactionKindEnum, null: false
  end
end
