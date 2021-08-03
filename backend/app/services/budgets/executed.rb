module Budgets
  # Calculate how much money was spend for this period
  class Executed < Service
    def initialize(budget_period:)
      @budget_period = budget_period
    end

    def call
      expenses + tax + loans + savings
    end

    private

    attr_reader :budget_period

    def expenses
      @expenses ||= executed_amount_for_kind(:expense)
    end

    def tax
      @tax ||= executed_amount_for_kind(:tax)
    end

    def loans
      @loans ||= executed_amount_for_kind(:loan)
    end

    def savings
      @savings ||= executed_amount_for_kind(:savings)
    end

    def executed_amount_for_kind(kind)
      budget_period.category_budgets.joins(:category).where(categories: { kind: Category.kinds[kind] }).sum(&:spend).to_money
    end
  end
end