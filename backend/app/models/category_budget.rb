class CategoryBudget < ApplicationRecord
  include Kindable

  belongs_to :budget_period
  belongs_to :category

  scope :missing, -> { where('planned_cents = 0') }
  scope :existing, -> { where('planned_cents != 0') }

  monetize :planned_cents

  # List of all transactions for category
  # @return [Array<Transaction>]
  def transactions
    if category.saving?
      budget_period.transactions.where(category_id: category.id, kind: kind)
    else
      budget_period.transactions.where(category_id: category.id)
    end
  end

  # How much money did user spend for category
  # @return [Money]
  def spend
    @spend ||= transactions.map(&:category_amount).sum.to_money(category.currency).abs
  end

  # Balance for the category
  # @return [Money]
  def balance
    @balance ||= transactions.map(&:category_amount).sum.to_money(category.currency)
  end

  # Returns in percent value between 0 - 1 how much of planned money have been spend
  # @return [Float]
  def executed
    return 0.0 if planned.zero? || spend.zero?

    @executed ||= [spend / planned, 1.0].min
  end

  def exchanged_spend
    @exchanged_spend ||= ExchangeRateService.exchange_with(
      budget_period.today,
      spend,
      ENV.fetch('MAIN_CURRENCY')
    )
  end

  def exchanged_planned
    @exchanged_planned ||= ExchangeRateService.exchange_with(
      budget_period.today,
      planned,
      ENV.fetch('MAIN_CURRENCY')
    )
  end

  # How much money have left before goal
  # @return [Money]
  def available
    planned - spend
  end
end
