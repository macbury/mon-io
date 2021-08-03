class CalendarController < ApplicationController
  use Recurrency::GenerateCalendar, as: :generate_calendar
  respond_to :ics
  before_action { authenticate_token!(TokenScopes::CALENDAR) }

  def show
    @calendar = generate_calendar(
      user: current_user,
      ignore_ids: series_ignore_ids_param
    )

    send_data @calendar, type: 'text/calendar',
                         disposition: 'attachment',
                         filename: 'calendar.ics'
  end

  private

  def series_ignore_ids_param
    params[:series_ignore_ids] || []
  end
end
