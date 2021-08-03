class ChangeCategoryPeriod < ActiveRecord::Migration[6.0]
  def change
    change_column :category_budgets, :budget_period_id, 'uuid USING CAST(budget_period_id AS UUID)'
  end
end
