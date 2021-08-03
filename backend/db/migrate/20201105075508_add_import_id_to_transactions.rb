class AddImportIdToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :import_id, :uuid
  end
end
