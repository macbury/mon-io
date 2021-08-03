# This is shared between Receipt and Import model
# It adds support for file method, and ensures that only one model can exists with similar file
module Attachment
  extend ActiveSupport::Concern

  included do
    validates :file, presence: true

    validates :file, presence: true
    validate :uniq_file_signature, on: :create

    scope :by_signature, ->(md5) { where(signature: md5) }

    before_save :signature
  end

  def signature
    sig = self[:signature]
    return sig if sig

    begin
      file&.download do |io|
        digest = Digest::MD5.new
        digest.update(io.read(16 * 1024, buffer ||= '')) until io.eof?
        sig = digest.hexdigest
        self[:signature] = sig

        return sig
      end
    rescue Shrine::FileNotFound
      nil
    end
  end

  private

  def uniq_file_signature
    errors.add(:file, I18n.t('errors.messages.taken')) if signature && self.class.by_signature(signature).exists?
  end
end