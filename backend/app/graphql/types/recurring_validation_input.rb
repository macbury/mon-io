module Types
  class RecurringValidationInput < BaseInputObject
    argument :day, [Integer], required: false
    argument :day_of_month, [Integer], required: false
    argument :day_of_week, [Integer], required: false
    argument :day_of_year, [Integer], required: false
  end
end