class User < ApplicationRecord
  devise :database_authenticatable, :rememberable, :trackable, :lockable,
         authentication_keys: { username: true, email: false }

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true

  has_many :imports, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :refresh_tokens, dependent: :destroy
  has_many :receipts, dependent: :destroy
  has_many :transactions, class_name: 'Transaction', foreign_key: 'author_id', dependent: :destroy, inverse_of: :author
  has_many :budget_periods, dependent: :destroy
  has_many :series, dependent: :destroy

  after_save :cleanup_old_tokens

  def cleanup_old_tokens
    refresh_tokens.old.destroy_all
  end
end
