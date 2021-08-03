class AddMapDataToLocation < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :map_data, :jsonb
  end
end
