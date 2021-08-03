module Transactions
  class TotalExpenses < Service
    attr_reader :user, :date
    def initialize(user:, date:)
      @user = user
      @date = date
    end

    def call
      Money.new(
        user
          .transactions
          .expense_or_tax
          .is_not_blueprint
          .for_month(date)
          .find_each
          .map(&:exchanged_amount)
          .sum
      )
    end
  end
end