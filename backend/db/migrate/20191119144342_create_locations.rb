class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations, id: :integer do |t|
      t.string :name
      t.string :full_address
      t.string :category
      t.string :city
      t.string :postcode
      t.string :country
      t.string :suburb

      t.decimal :lat, precision: 10, scale: 6
      t.decimal :lng, precision: 10, scale: 6

      t.timestamps
    end
  end
end
