class AddSignatureToReceipts < ActiveRecord::Migration[6.0]
  def change
    add_column :receipts, :signature, :string
  end
end
