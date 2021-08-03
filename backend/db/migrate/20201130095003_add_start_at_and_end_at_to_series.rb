class AddStartAtAndEndAtToSeries < ActiveRecord::Migration[6.0]
  def change
    add_column :series, :start_at, :date
    add_column :series, :end_at, :date
  end
end
