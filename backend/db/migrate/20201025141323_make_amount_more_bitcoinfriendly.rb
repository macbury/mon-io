class MakeAmountMoreBitcoinfriendly < ActiveRecord::Migration[6.0]
  def change
    change_column :transactions, :amount_cents, :integer, limit: 8
  end
end
