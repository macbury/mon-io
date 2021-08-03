class AddReceiptIdToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :receipts, :transaction_id, :uuid
  end
end
