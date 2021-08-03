module Recurrency
  class ScheduleBuilder
    attr_reader :series, :schedule, :recurrence

    def initialize(series)
      @series = series
      @schedule = IceCube::Schedule.new(series.start_at)
      @schedule.end_time = series.end_at
      @recurrence = series.recurrence
    end

    def build
      if respond_to?("schedule_#{recurrence}", true)
        send("schedule_#{recurrence}")
      else
        Rails.logger.error "Define schedule_#{recurrence} in #{self.class} to support this type of recurrence"
        throw "Unsuported recurrence #{recurrence}"
      end

      schedule
    end

    private

    def schedule_once
      schedule.end_time = series.blueprint.date
      schedule.add_recurrence_rule IceCube::Rule.daily.count(1)
    end

    def schedule_everyday
      schedule.add_recurrence_rule IceCube::Rule.daily(1)
    end

    def schedule_every_two_days
      schedule.add_recurrence_rule IceCube::Rule.daily(2)
    end

    def schedule_weekdays
      schedule.add_recurrence_rule IceCube::Rule.daily.day(
        :monday,
        :tuesday,
        :wednesday,
        :thursday,
        :friday
      )
    end

    def schedule_weekends
      schedule.add_recurrence_rule IceCube::Rule.daily.day(
        :saturday,
        :sunday
      )
    end

    def schedule_every_week
      schedule.add_recurrence_rule IceCube::Rule.weekly
    end

    def schedule_every_two_weeks
      schedule.add_recurrence_rule IceCube::Rule.weekly(2)
    end

    def schedule_every_four_weeks
      schedule.add_recurrence_rule IceCube::Rule.weekly(4)
    end

    def schedule_every_month
      schedule.add_recurrence_rule IceCube::Rule.monthly
    end

    def schedule_every_two_months
      schedule.add_recurrence_rule IceCube::Rule.monthly(2)
    end

    def schedule_every_three_months
      schedule.add_recurrence_rule IceCube::Rule.monthly(3)
    end

    def schedule_every_six_months
      schedule.add_recurrence_rule IceCube::Rule.monthly(6)
    end

    def schedule_every_year
      schedule.add_recurrence_rule IceCube::Rule.yearly
    end
  end
end
