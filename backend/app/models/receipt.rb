class Receipt < ApplicationRecord
  include ReceiptUploader::Attachment(:file)
  include Attachment
  include Geocodable

  belongs_to :user
  belongs_to :category, optional: true
  belongs_to :owner, optional: true, foreign_key: 'transaction_id', class_name: 'Transaction', inverse_of: :receipt

  scope :pending, -> { where(transaction_id: nil) }

  scope :with_transaction, -> { where('transaction_id IS NOT NULL').lazy_preload(:owner) }
end
