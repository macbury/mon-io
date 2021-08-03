module Types
  class RecurrencyTypeEnum < BaseEnum
    graphql_name 'RecurrencyType'

    value 'Daily', value: 'IceCube::DailyRule'
    value 'Weekly', value: 'IceCube::WeeklyRule'
    value 'Monthly', value: 'IceCube::MonthlyRule'
    value 'Yearly', value: 'IceCube::YearlyRule'
  end
end