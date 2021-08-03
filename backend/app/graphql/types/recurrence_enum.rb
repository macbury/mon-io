module Types
  class RecurrenceEnum < BaseEnum
    graphql_name 'Recurrence'

    value 'None', value: 'none'

    Series.recurrences.each do |key, value|
      value key.camelcase, value: value
    end
  end
end