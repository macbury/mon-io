module Recurrency
  class GenerateCalendar < Service
    def initialize(user:, ignore_ids: [])
      @user = user
      @ignore_ids = ignore_ids + ['00000000-0000-0000-0000-000000000000']
    end

    def call
      each_planned_transactions do |transaction|
        ical.event do |e|
          e.dtstart = transaction.date
          e.dtend = transaction.date
          e.summary = [transaction.category.name, transaction.notes].reject(&:empty?).join(': ')
        end
      end
      ical.to_ical
    end

    private

    attr_reader :user, :ignore_ids

    def ical
      @ical ||= Icalendar::Calendar.new
    end

    def each_planned_transactions
      user.series.where('id NOT IN (?)', ignore_ids).in_range(to_date).find_each do |series|
        PlannedTransactions.new(series: series, from_date: from_date, to_date: to_date, executed: false).each do |transaction|
          yield transaction
        end
      end
    end

    def from_date
      Time.zone.now.at_beginning_of_month
    end

    def to_date
      6.months.from_now.end_of_month
    end
  end
end