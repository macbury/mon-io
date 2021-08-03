class Series < ApplicationRecord
  enum recurrence: {
    once: 'once',
    everyday: 'everyday',
    every_two_days: 'every_two_days',
    weekdays: 'weekdays',
    weekends: 'weekends',
    every_week: 'every_week',
    every_two_weeks: 'every_two_weeks',
    every_four_weeks: 'every_four_weeks',
    every_month: 'every_month',
    every_two_months: 'every_two_months',
    every_three_months: 'every_three_months',
    every_six_months: 'every_six_months',
    every_year: 'every_year'
  }

  belongs_to :user
  belongs_to :parent, class_name: 'Series', optional: true
  has_many :entries, class_name: 'SeriesEntry', dependent: :destroy
  has_many :transactions, through: :entries, source: :operation

  # This is the transaction used for creating all other transactions
  has_one :blueprint, dependent: :destroy, class_name: 'Transaction', foreign_key: 'blueprint_id', inverse_of: :series_blueprint

  scope :by_name, -> { joins(:blueprint).order('transactions.notes ASC') }
  scope :by_category, -> { joins(blueprint: :category).order('categories.name ASC') }
  scope :in_range, ->(date) { where('end_at IS NULL OR end_at >= ?', date) }

  validates :blueprint, :user, :start_at, :recurrence, presence: true

  def schedule
    @schedule ||= Recurrency::ScheduleBuilder.new(self).build
  end

  # def ignored_dates
  #   @ignored_dates ||= entries.ignored.pluck(:occured_at)
  # end

  # def existing_dates
  #   @existing_dates ||= entries.not_ignored.pluck(:occured_at)
  # end
end
