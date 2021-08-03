module Types
  class TransactionAttributesInput < BaseInputObject
    description 'Properties updated in transaction'

    argument :kind, Types::TransactionKindEnum, required: true
    argument :amount_cents, Integer, required: false
    argument :amount_currency, String, required: false
    argument :category_id, ID, required: false
    argument :location_id, ID, required: false
    argument :receipt_id, ID, required: false
    argument :notes, String, required: false
    argument :date, GraphQL::Types::ISO8601DateTime, required: false
  end
end
