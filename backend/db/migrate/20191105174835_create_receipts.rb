class CreateReceipts < ActiveRecord::Migration[6.0]
  def change
    create_table :receipts, id: :uuid do |t|
      t.uuid :category_id
      t.jsonb :file_data
      t.uuid :user_id
      t.decimal :lat, precision: 10, scale: 6
      t.decimal :lng, precision: 10, scale: 6
      
      t.timestamps
    end
  end
end
