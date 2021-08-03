class RefreshToken < ApplicationRecord
  belongs_to :user
  before_create :generate_jwt_hmac_secret_base
  validates :name, :ip, presence: true

  enum kind: {
    normal: 'normal',
    long: 'long'
  }

  scope :old, -> { where('expire_at < ?', Time.zone.now) }

  after_create :prolong!

  # combine this secret with rails secret
  def generate_jwt_hmac_secret_base
    self.jwt_hmac_secret_base = SecureRandom.hex(32)
  end

  def prolong!
    update!(expire_at: prolong_time)
  end

  def prolong_time
    normal? ? 1.month.from_now : 10.years.from_now
  end
end
