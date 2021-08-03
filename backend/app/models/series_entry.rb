class SeriesEntry < ApplicationRecord
  belongs_to :series
  belongs_to :operation, class_name: 'Transaction', optional: true

  scope :ignored, -> { where(operation_id: nil) }
  scope :ignored, -> { where(operation_id: nil) }
  scope :not_ignored, -> { where.not(operation_id: nil) }
  scope :in_range, ->(start_at, end_at) { where('occured_at >= ? AND occured_at <= ?', start_at, end_at) }

  validates :occured_at, presence: true, uniqueness: { scope: :series_id }
end
