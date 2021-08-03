class AddNotesToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :notes, :text, default: ''
  end
end
