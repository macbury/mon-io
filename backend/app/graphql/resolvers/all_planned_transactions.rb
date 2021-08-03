module Resolvers
  class AllPlannedTransactions < Base
    type [Types::PlannedTransactionType], null: true

    argument :month, Types::TimeArgument, required: true
    argument :executed, Boolean, required: false, description: 'Include also past transactions'
    argument :all, Boolean, required: false, description: 'Include all transactions for this month'

    def resolve(month:, executed: false, all: false)
      from_date = month.to_date.at_beginning_of_month
      to_date = month.to_date.end_of_month

      current_user.series.in_range(to_date).lazy_preload(:blueprint, :user).find_each.flat_map do |series|
        planned = PlannedTransactions.new(
          series: series,
          from_date: from_date,
          to_date: to_date,
          executed: executed
        )

        all ? planned.to_a : planned.first
      end.compact.sort_by(&:date)
    end
  end
end