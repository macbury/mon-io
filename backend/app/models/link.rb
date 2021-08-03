class Link < ApplicationRecord
  has_many :transactions, dependent: :nullify
  validates :url, presence: true
end
