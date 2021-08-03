class AddFieldsToCategories < ActiveRecord::Migration[6.0]
  def change
    add_column :categories, :kind, :integer, default: 0
  end
end
