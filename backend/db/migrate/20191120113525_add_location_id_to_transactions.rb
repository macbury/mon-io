class AddLocationIdToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :location_id, :integer
  end
end
