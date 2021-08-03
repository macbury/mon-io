module Transactions
  class TotalLoans < Service
    attr_reader :user, :date

    def initialize(user:, date:)
      @user = user
      @date = date
    end

    def call
      Money.new(
        user
          .transactions
          .loan
          .is_not_blueprint
          .for_month(date)
          .find_each
          .map(&:exchanged_amount)
          .sum
      ).abs
    end
  end
end