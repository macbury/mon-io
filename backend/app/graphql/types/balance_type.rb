module Types
  class BalanceType < Types::BaseObject
    field :category, CategoryType, null: false
    field :today, BalancePeriodType, null: false, description: 'Balance for current month'
    field :history, [BalancePeriodType], null: false, description: 'Balance history'

    def today
      history.last
    end

    def category
      object[:category]
    end

    def history
      object[:history].map { |month, value| { month: month, value: value } }.sort_by { |a| a[:month] }
    end
  end
end
