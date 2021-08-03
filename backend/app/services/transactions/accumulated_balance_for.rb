module Transactions
  # Returns raising balance per month
  class AccumulatedBalanceFor < Service
    use BalanceFor, as: :balance_for

    def initialize(category:, users:)
      @category = category
      @users = users
    end

    def call
      sorted_months[1..-1].each_with_index do |month, index|
        prev_month = sorted_months[index]
        balances[month] = balances[prev_month] + balances[month]
      end

      balances
    end

    private

    attr_reader :category, :users

    def balances
      @balances ||= balance_for(category: category, users: users)
    end

    def sorted_months
      @sorted_months ||= balances.keys.sort
    end
  end
end