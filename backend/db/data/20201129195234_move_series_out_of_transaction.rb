class MoveSeriesOutOfTransaction < ActiveRecord::Migration[6.0]
  def up
    Transaction.update_all(series_date: nil, series_id: nil)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
