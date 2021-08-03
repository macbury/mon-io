module Transactions
  class TotalIncome < Service
    attr_reader :user, :date

    def initialize(user:, date:)
      @user = user
      @date = date
    end

    def call
      Money.new(
        user
          .transactions
          .income
          .is_not_blueprint
          .for_month(date)
          .find_each
          .map(&:exchanged_amount)
          .sum
      )
    end
  end
end