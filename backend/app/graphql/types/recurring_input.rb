module Types
  class RecurringInput < BaseInputObject
    argument :interval, Integer, required: true
    argument :rule_type, Types::RecurrencyTypeEnum, required: true
    argument :week_start, Integer, required: true
    argument :validations, Types::RecurringValidationInput, required: true
  end
end
