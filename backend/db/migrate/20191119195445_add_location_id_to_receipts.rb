class AddLocationIdToReceipts < ActiveRecord::Migration[6.0]
  def change
    add_column :receipts, :location_id, :integer, default: nil
  end
end
