module Mutations
  class IgnoreRecurrence < Types::BaseMutation
    null true

    argument :series_id, ID, required: false
    argument :at_date, GraphQL::Types::ISO8601DateTime, required: false

    field :series, Types::SeriesType, null: true
    field :errors, [String], null: false

    def resolve(series_id:, at_date:)
      series = current_user.series.find(series_id)

      series.entries.find_or_create_by!(occured_at: at_date)

      {
        series: series,
        errors: []
      }
    end
  end
end