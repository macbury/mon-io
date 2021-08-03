class AddKindToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :kind, :integer
  end
end
