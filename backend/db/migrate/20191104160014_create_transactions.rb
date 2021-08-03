class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions, id: :uuid do |t|
      t.string :type
      t.uuid :author_id
      t.uuid :category_id
      t.uuid :receipt_id
      t.decimal :lat, precision: 10, scale: 6
      t.decimal :lng, precision: 10, scale: 6
      t.time :date
      t.monetize :amount, default: 0

      t.timestamps
    end

    add_index :transactions, [:lat, :lng]
  end
end
