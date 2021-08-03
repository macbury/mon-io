module Budgets
  # Calculate how much money is not allocated in current budget. This takes into account only planned amounts
  class Unallocated < Service
    def initialize(budget_period:)
      @budget_period = budget_period
    end

    def call
      income - expenses - tax - loans - savings
    end

    private

    attr_reader :budget_period

    def income
      @income ||= planned_amount_for_kind(:income)
    end

    def expenses
      @expenses ||= planned_amount_for_kind(:expense)
    end

    def tax
      @tax ||= planned_amount_for_kind(:tax)
    end

    def loans
      @loans ||= planned_amount_for_kind(:loan)
    end

    def savings
      @savings ||= planned_amount_for_kind(:savings)
    end

    def planned_amount_for_kind(kind)
      budget_period.category_budgets.joins(:category).where(categories: { kind: Category.kinds[kind] }).sum(&:exchanged_planned).to_money
    end
  end
end