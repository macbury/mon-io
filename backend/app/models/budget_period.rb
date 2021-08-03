class BudgetPeriod < ApplicationRecord
  SAVING_KIND = [:deposit, :withdraw].freeze
  use Budgets::Unallocated, as: :calculate_unallocated
  use Budgets::Executed, as: :calculate_executed

  belongs_to :user
  has_many :category_budgets, dependent: :destroy

  validates :date, presence: true, uniqueness: { scope: :user_id }

  def shared_categories
    @shared_categories ||= CategoryBudget.joins(:category, :budget_period).where(
      categories: { shared: true },
      budget_periods: { date: date }
    ).where.not(budget_period_id: id)
  end

  # Categories that don't have planned amount or don't exists
  # @return [Array<CategoryBudget>]
  def missing_category_budgets
    @missing_category_budgets ||= Category.for_user(user).not_archived.flat_map do |category|
      if category.saving?
        SAVING_KIND.map do |saving_kind|
          next if category_budgets.existing.where(category_id: category.id, kind: saving_kind).exists?

          category_budgets.build(
            category_id: category.id,
            planned_currency: category.currency,
            kind: saving_kind
          )
        end
      else
        next if category_budgets.existing.where(category_id: category.id).exists?

        category_budgets.build(
          category_id: category.id,
          planned_currency: category.currency,
          kind: category.kind
        )
      end
    end.compact
  end

  def transactions
    Transaction.for_user(user).for_month(date).is_not_blueprint
  end

  def balance
    @balance ||= (income + withdraws) - (deposits + loans + expenses)
  end

  def expenses
    @expenses ||= transactions.expense_or_tax.sum(&:exchanged_amount).to_money.abs
  end

  def loans
    @loans ||= transactions.loan.sum(&:exchanged_amount).to_money.abs
  end

  def income
    @income ||= transactions.income.sum(&:exchanged_amount).to_money.abs
  end

  def withdraws
    @withdraws ||= transactions.withdraw.sum(&:exchanged_amount).to_money.abs
  end

  def deposits
    @deposits ||= transactions.deposit.sum(&:exchanged_amount).to_money.abs
  end

  def self.at(date)
    find_or_create_by(date: date.at_beginning_of_month)
  end

  def start
    date.to_datetime.at_beginning_of_month
  end

  def stop
    date.to_datetime.end_of_month
  end

  # Returns current date or stop date for this period. Helpful for exchange stuff
  # @return [Date]
  def today
    [Time.zone.today, stop].min
  end
end
