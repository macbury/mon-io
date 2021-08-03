module Budgets
  # Projects spendins/incomes calculating average transaction amounts for last 3 months
  class Projected < Service
    def initialize(user:, number_of_months: 3, date: nil)
      @user = user
      @origin = (date || Time.zone.now).to_date
      @number_of_months = number_of_months
    end

    def call
      agregated_amounts.transform_values do |amount|
        amount / number_of_months
      end
    end

    private

    attr_reader :date, :user, :number_of_months, :origin

    def agregated_amounts
      sums.each_with_object(categories) do |month_sums, aggregate|
        month_sums.each do |category, amount|
          aggregate[category] += amount
        end
      end
    end

    def sums
      @sums ||= (1..number_of_months).map do |month_offset|
        date = (origin - month_offset.month).at_beginning_of_month
        sum_of_transactions_amount_by_category(date)
      end
    end

    def sum_of_transactions_amount_by_category(date)
      Transaction.shared_or_for_user(user).is_not_blueprint.for_month(date).lazy_preload(:category).find_each.each_with_object(categories) do |transaction, agregate|
        agregate[transaction.category] += transaction.exchanged_amount
      end
    end

    def categories
      Category.all.index_with { 0.to_money }
    end
  end
end