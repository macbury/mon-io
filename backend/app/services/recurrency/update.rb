module Recurrency
  # Base class for updating series. It has helpful methods that can check if series need to update
  class Update < TransactionService
    attr_reader :original_series, :series_arguments, :transaction_args

    def initialize(series:, transaction_args:, **kwargs)
      @original_series = series
      @series_arguments = kwargs
      @transaction_args = transaction_args
    end

    private

    def transaction_arguments
      original_series
        .blueprint
        .attributes
        .except('id', 'blueprint_id', 'created_at', 'updated_at')
        .symbolize_keys
        .merge(transaction_args.except(:url))
    end

    # Check if passed arguments would trigger
    def series_needs_update?
      new_series = Series.find(original_series.id)
      new_series.assign_attributes(series_arguments)
      new_series.blueprint.assign_attributes(transaction_arguments.except(:date))
      new_series.blueprint.update_amount

      new_series.changed? || new_series.blueprint.changed?
    end

    def update_current_series
      original_series.update!(series_arguments)
      original_series.blueprint.update!(transaction_arguments)

      original_series
    end
  end
end