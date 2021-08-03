module Types
  class SeriesType < BaseObject
    field :id, ID, null: false
    field :recurrence, Types::RecurrenceEnum, null: false
    field :start_at, GraphQL::Types::ISO8601Date, null: false
    field :end_at, GraphQL::Types::ISO8601Date, null: true

    field :blueprint, Types::TransactionType, null: false
  end
end
