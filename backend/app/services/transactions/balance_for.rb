module Transactions
  # Returns sum of transactions groupped by month
  class BalanceFor < Service
    # TODO: not all categories are using main currency
    # this service should only agregate only one category per multiple users
    def initialize(category:, users:)
      @category = category
      @users = users
      @balances = {
        Time.zone.today.at_beginning_of_month => zero_amount
      }
    end

    # @return Hash<Date => Money>
    def call
      collect_balances_for_each_month
      fill_missing_months
      balances
    end

    private

    attr_reader :category, :users, :balances

    def zero_amount
      0.to_money(category.currency)
    end

    def collect_balances_for_each_month
      Transaction
        .is_not_blueprint
        .includes(:category)
        .where(author_id: users.map(&:id))
        .where(category_id: category.id)
        .order('date ASC')
        .find_each { |transaction| sum(transaction) }
    end

    def sum(transaction)
      month = transaction.date.at_beginning_of_month.to_date
      balances[month] ||= zero_amount
      balances[month] += transaction.category_amount
    end

    def fill_missing_months
      start_month = balances.keys.min
      end_month = balances.keys.max

      while start_month <= end_month
        balances[start_month] ||= zero_amount
        start_month += 1.month
      end
    end
  end
end