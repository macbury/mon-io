module Mutations
  class UpdateRecurrence < Types::BaseMutation
    use Recurrency::UpdateOnlyThis, as: :update_only_this
    use Recurrency::UpdateThisAndFuture, as: :update_this_and_future
    null true

    RecurrenceUpdateModeEnum = GraphQL::EnumType.define do
      name 'RecurrenceUpdateMode'

      value 'OnlyThis', value: :only_this
      value 'ThisAndFuture', value: :this_and_future
    end

    argument :series_id, ID, required: true
    argument :recurrence, Types::RecurrenceEnum, required: true
    argument :update_type, RecurrenceUpdateModeEnum, required: true
    argument :end_at, GraphQL::Types::ISO8601DateTime, required: false

    argument :transaction, Types::TransactionAttributesInput, required: true

    field :series, Types::SeriesType, null: true
    field :errors, [String], null: false

    def resolve(series_id:, update_type:, transaction:, **kwargs)
      series = current_user.series.find(series_id)

      params = {
        series: series,
        transaction_args: transaction.to_h
      }.merge(kwargs)

      updated_series = update_type == :only_this ? update_only_this(params) : update_this_and_future(params)

      {
        series: updated_series,
        errors: []
      }
    end
  end
end