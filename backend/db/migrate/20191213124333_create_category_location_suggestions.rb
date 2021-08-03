class CreateCategoryLocationSuggestions < ActiveRecord::Migration[6.0]
  def change
    create_table :category_location_suggestions, id: :uuid do |t|
      t.string :category_id
      t.integer :location_id
      t.float :rank, default: 0.0

      t.timestamps
    end
  end
end
