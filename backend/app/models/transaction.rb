class Transaction < ApplicationRecord
  include Kindable
  include Geocodable
  include PgSearch::Model

  pg_search_scope :search_by_notes, against: :notes, using: { trigram: { threshold: 0.2 } }

  belongs_to :link, optional: true
  belongs_to :author, class_name: 'User', inverse_of: :transactions
  belongs_to :category
  belongs_to :location, optional: true
  belongs_to :import, optional: true
  # This tells us that this transaction is used as blueprint for all created transactions in series
  belongs_to :series_blueprint, foreign_key: 'blueprint_id', class_name: 'Series', optional: true, inverse_of: :blueprint

  has_one :series_entry, inverse_of: :operation, dependent: :destroy, foreign_key: :operation_id
  has_one :receipt, dependent: :destroy
  has_one :series, through: :series_entry

  monetize :amount_cents

  validates :date, presence: true
  validates :amount_cents, presence: true, numericality: { other_than: 0 }

  scope :for_month, ->(date) { where('date >= :start AND date <= :end', start: date.at_beginning_of_month, end: date.end_of_month) }

  scope :for_user, ->(user) { where('transactions.author_id = :author_id', author_id: user.id) }
  scope :shared_or_for_user, ->(user) { where('transactions.author_id = :author_id OR categories.shared = true OR categories.user_id = :author_id', author_id: user.id).joins(:category) }
  scope :is_not_in_series, -> { left_outer_joins(:series_entry).where(series_entries: { id: nil }) }
  scope :is_in_series, -> { joins(:series_entry).where.not(series_entries: { id: nil }) }
  scope :is_not_blueprint, -> { where(blueprint_id: nil) }
  # All transactions that belongs to expense category
  scope :expense, -> { where(kind: [kinds[:expense], kinds[:tax]]) }
  # All transactions that belongs to expense category and tax
  scope :expense_or_tax, -> { where(kind: [kinds[:expense], kinds[:tax]]) }
  # Incomes and savings
  scope :income_or_saving, -> { where(kind: [kinds[:income], kinds[:withdraw], kinds[:deposit], kinds[:loan]]) }
  # All transactions that belongs to income category
  scope :income, -> { where(kind: kinds[:income]) }
  # All transactions that are damn high taxes!
  scope :tax, -> { where(kind: kinds[:tax]) }
  # All transactions with kind withdraw, deposit
  scope :savings, -> { where(kind: [kinds[:withdraw], kinds[:deposit]]) }

  before_save :update_amount

  attr_accessor :series_date

  def exchanged_amount
    @exchanged_amount ||= ExchangeRateService.exchange_with(date, amount, ENV.fetch('MAIN_CURRENCY'))
  end

  def category_amount
    @category_amount ||= ExchangeRateService.exchange_with(date, amount, category.currency.iso_code)
  end

  def blueprint?
    series_blueprint.present?
  end

  def update_amount
    self.amount_cents = positive? ? amount_cents.abs : -amount_cents.abs
  end
end
