class RemoveReceiptIdFromTransactions < ActiveRecord::Migration[6.0]
  def change
    remove_column :transactions, :receipt_id
  end
end
