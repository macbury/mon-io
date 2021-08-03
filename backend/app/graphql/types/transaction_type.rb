module Types
  class TransactionType < BaseObject
    field :category, CategoryType, null: false
    field :location, LocationType, null: true
    field :receipt, ReceiptType, null: true
    field :series, SeriesType, null: true
    field :import, ImportType, null: true
    field :link, LinkType, null: true

    field :id, ID, null: false
    field :author, UserType, null: false, description: 'Person that created this transaction'
    field :amount, MoneyType, null: false, description: 'Original amount, that can be different than main currency'
    field :exchanged_amount, MoneyType, null: false, description: 'Amount exchanged to main currency'
    field :notes, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :date, GraphQL::Types::ISO8601DateTime, null: false
    field :kind, Types::TransactionKindEnum, null: false

    field :lat, Float, null: false
    field :lng, Float, null: false
    field :recurrence, Types::RecurrenceEnum, null: false

    def recurrence
      object.series&.recurrence || 'none'
    end
  end
end
