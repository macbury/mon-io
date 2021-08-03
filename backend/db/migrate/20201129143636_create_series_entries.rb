class CreateSeriesEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :series_entries, id: :uuid do |t|
      t.belongs_to :series, null: false, foreign_key: true, type: :uuid
      t.uuid :operation_id, null: true
      t.date :occured_at

      t.timestamps
    end
  end
end
