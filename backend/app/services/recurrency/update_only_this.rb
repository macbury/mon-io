module Recurrency
  # Update only current series, This action will
  # add new series entry with ignore date for current date
  # create new series for current date with repeating once and updated info
  # if current series repeating is once then it will just update information
  class UpdateOnlyThis < Update
    def call
      return original_series unless series_needs_update?
      return update_current_series if original_series.once?

      create_new_repeating_once_series
    end

    private

    def create_new_repeating_once_series
      new_series = Series.new(original_series.attributes.except('id', 'created_at'))
      new_series.assign_attributes(series_arguments)

      blueprint = original_series.user.transactions.create!(transaction_arguments)

      new_series.assign_attributes(
        id: nil,
        recurrence: :once,
        blueprint: blueprint,
        parent_id: original_series.id,
        start_at: blueprint.date,
        end_at: blueprint.date
      )

      new_series.save!
      original_series.entries.create!(occured_at: blueprint.date)

      new_series
    end
  end
end