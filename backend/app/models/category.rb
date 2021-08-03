class Category < ApplicationRecord
  include Kindable

  belongs_to :user, optional: true

  has_many :transactions, dependent: :destroy
  has_many :receipts, dependent: :destroy
  has_many :imports, dependent: :destroy
  has_many :category_location_suggestions, dependent: :destroy
  has_many :category_budgets, dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :color, presence: true
  validates :icon, presence: true

  scope :for_user, ->(user) { where('shared = true OR user_id IS NULL OR user_id = :user_id', user_id: user.id) }
  scope :not_archived, -> { where(archived: false) }
  scope :for_ids, ->(category_ids) { category_ids.empty? ? all : where('id NOT IN (?)', category_ids) }
  scope :expense_or_tax, -> { where({ kind: [Category.kinds[:expense], Category.kinds[:tax]] }) }
  scope :income_or_saving, -> { where({ kind: [Category.kinds[:income], Category.kinds[:saving], Category.kinds[:loan]] }) }

  def currency
    local_currency = self[:currency]
    if local_currency
      Money::Currency.new(local_currency)
    else
      Money.default_currency
    end
  end
end
