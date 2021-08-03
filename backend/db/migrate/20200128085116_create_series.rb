class CreateSeries < ActiveRecord::Migration[6.0]
  def change
    create_table :series, id: :uuid do |t|
      t.uuid :user_id
      t.json :schedule_data, default: {}

      t.timestamps
    end

    add_column :transactions, :series_id, :uuid
    add_column :transactions, :blueprint_id, :uuid
  end
end
