class ChangeCategoryBudgetsType < ActiveRecord::Migration[6.0]
  def change
    change_column :category_budgets, :category_id, 'uuid USING CAST(category_id AS UUID)'
  end
end
