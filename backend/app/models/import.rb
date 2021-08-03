# This model tracks all data imports of csv files in the application. It contains settings to parse csv, and additionaly tracks what record was imported. This is helpful if import goes shit and you want to remove the wrongly imported transaction
class Import < ApplicationRecord
  include CsvUploader::Attachment(:file)
  include Attachment

  belongs_to :user
  belongs_to :category, optional: true

  has_many :transactions, dependent: :destroy

  scope :processed, -> { where(processed: true) }
  scope :not_processed, -> { where(processed: false) }

  before_create :fill_missing_name

  private

  def fill_missing_name
    self.name ||= file&.metadata&.dig('filename')
  rescue Shrine::FileNotFound
    nil
  end
end
