module Recurrency
  class UpdateThisAndFuture < Update
    def call
      return original_series unless series_needs_update?

      blueprint = original_series.user.transactions.new(transaction_arguments)

      return update_current_series if original_series.start_at == blueprint.date.to_date || original_series.once?

      create_new_series_from_now
    end

    def create_new_series_from_now
      new_series = Series.new(original_series.attributes.except('id', 'created_at', 'start_at'))
      new_series.assign_attributes(series_arguments)

      blueprint = original_series.user.transactions.create!(transaction_arguments)

      new_series.assign_attributes(
        id: nil,
        blueprint: blueprint,
        parent_id: original_series.id,
        start_at: blueprint.date
      )

      new_series.save!
      original_series.update!(end_at: blueprint.date - 1.day)

      original_series.entries.pluck(:occured_at).each do |occured_at|
        new_series.entries.create!(occured_at: occured_at)
      end

      new_series
    end
  end
end