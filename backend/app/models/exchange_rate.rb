class ExchangeRate < ApplicationRecord
  validates :value, presence: true, numericality: { greater_than: 0 }
  validates :date, presence: true
end
