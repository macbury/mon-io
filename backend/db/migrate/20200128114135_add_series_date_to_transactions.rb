class AddSeriesDateToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :series_date, :date
  end
end
