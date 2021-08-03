class AddLinkIdToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :link_id, :uuid
  end
end
