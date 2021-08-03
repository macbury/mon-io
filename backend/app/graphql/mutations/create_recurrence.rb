module Mutations
  class CreateRecurrence < Types::BaseMutation
    use Recurrency::Create, as: :create_recurrency
    null true

    argument :transaction_id, ID, required: false
    argument :recurrence, Types::RecurrenceEnum, required: false

    field :series, Types::SeriesType, null: true
    field :errors, [String], null: false

    def resolve(transaction_id:, recurrence:)
      blueprint = current_user.transactions
                              .is_not_blueprint
                              .is_not_in_series
                              .find(transaction_id)

      series = create_recurrency(
        transaction: blueprint,
        user: current_user,
        recurrence: recurrence
      )

      {
        series: series,
        errors: []
      }
    end
  end
end