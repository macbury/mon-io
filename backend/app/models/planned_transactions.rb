# Enumerable that returns not existing planned transactions for series
class PlannedTransactions
  include Enumerable

  attr_reader :series, :from_date, :to_date, :executed

  def initialize(series:, from_date:, to_date:, executed:)
    @series = series
    @from_date = from_date.to_date
    @to_date = to_date.to_date

    @author = series.user
    @schedule = series.schedule
    @blueprint = series.blueprint
    @executed = executed
  end

  # @yield [Transaction] new not persisted transaction
  def each
    occurences.each do |date_time|
      date = date_time.to_date

      next if ignore_dates.include?(date)

      transaction = Transaction.new(
        author: author,
        category: blueprint.category,
        amount: blueprint.amount,
        date: date_time,
        notes: blueprint.notes,
        series_date: date
      )

      transaction.link = blueprint.link
      transaction.series = series
      yield transaction
    end
  end

  def self.for_month(series, date, &block)
    new(
      series: series,
      from_date: date.from_date.at_beginning_of_month,
      to_date: date.to_date.end_of_month
    ).each(&block)
  end

  private

  attr_reader :author, :blueprint, :schedule

  def occurences
    @occurences ||= schedule.occurrences_between(from_date, last_day)
  end

  def ignore_dates
    series.entries.in_range(from_date, last_day).pluck(:occured_at)
  end

  def last_day
    [to_date, series.end_at].compact.min
  end
end