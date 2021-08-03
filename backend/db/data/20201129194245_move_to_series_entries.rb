class MoveToSeriesEntries < ActiveRecord::Migration[6.0]
  def up
    ActiveRecord::Base.transaction do
      Transaction.where(blueprint_id: nil).where.not(series_id: nil).find_each do |transaction|
        create_entry(transaction, transaction.series_date)
        create_entry(transaction, transaction.date)
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end

  def create_entry(transaction, date)
    return unless date

    entry = SeriesEntry.find_or_create_by(occured_at: date)
    entry.assign_attributes(
      operation: transaction,
      series_id: transaction.series_id
    )
    entry.save!
  end
end
