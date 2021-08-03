class AddSharedToCategories < ActiveRecord::Migration[6.0]
  def change
    add_column :categories, :shared, :boolean, default: false
  end
end
