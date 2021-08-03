module Transactions
  class Difference < Service
    attr_reader :user, :date

    use TotalIncome, as: :calculate_income
    use TotalExpenses, as: :calculate_expense

    def initialize(user:, date:)
      @user = user
      @date = date
    end

    def call
      income + expenses
    end

    private

    def income
      @income ||= calculate_income(user: user, date: date)
    end

    def expenses
      @expenses ||= calculate_expense(user: user, date: date)
    end
  end
end