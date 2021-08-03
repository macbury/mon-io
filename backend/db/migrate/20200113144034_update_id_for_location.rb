class UpdateIdForLocation < ActiveRecord::Migration[6.0]
  def up
    Location.delete_all
    remove_column :locations, :id
    add_column :locations, :id, :string, index: true, primary_key: true
    change_column :receipts, :location_id, :string
    change_column :transactions, :location_id, :string
    change_column :category_location_suggestions, :location_id, :string
  end

  def down; end
end
