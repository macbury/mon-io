module Types
  class ImportRowType < BaseInputObject
    argument :uuid, String, required: false, description: 'This field is used for tracking existing transactions, and updating them instead destroying and recreating'
    argument :notes, String, required: false
    argument :amount, String, required: false
    argument :date, TimeArgument, required: false
    argument :kind, Types::TransactionKindEnum, required: false
  end
end
