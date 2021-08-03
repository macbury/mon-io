module Mutations
  class CreateTransaction < Types::BaseMutation
    null true

    argument :amount, Integer, required: true
    argument :currency, String, required: true
    argument :category_id, ID, required: false
    argument :receipt_id, ID, required: false
    argument :notes, String, required: false
    argument :kind, Types::TransactionKindEnum, required: true
    argument :location, Types::LocationInput, required: false
    argument :date, GraphQL::Types::ISO8601DateTime, required: false

    argument :series_id, ID, required: false
    argument :series_date, GraphQL::Types::ISO8601DateTime, required: false

    field :transaction, Types::TransactionType, null: true
    field :errors, [String], null: false

    def resolve(amount:, category_id: nil, receipt_id: nil, currency: nil, location: {}, date: nil, notes: '', series_date: nil, series_id: nil, kind:)
      ActiveRecord::Base.transaction do
        receipt = current_user.receipts.pending.find_by(id: receipt_id)

        transaction = current_user.transactions.create!(
          amount_cents: amount,
          amount_currency: currency,
          date: date,
          notes: notes,
          lat: location&.dig(:lat),
          lng: location&.dig(:lng),
          category_id: category_id,
          kind: kind
        )

        if series_id && series_date
          series = current_user.series.find(series_id)
          series.entries.create!(
            series: series,
            operation: transaction,
            occured_at: series_date
          )
        end

        receipt&.update(transaction_id: transaction.id)

        {
          transaction: transaction,
          errors: []
        }
      end
    end
  end
end