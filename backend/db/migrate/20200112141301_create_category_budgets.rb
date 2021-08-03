class CreateCategoryBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :category_budgets, id: :uuid do |t|
      t.monetize :planned, default: 0
      t.string :category_id
      t.string :budget_period_id

      t.timestamps
    end
  end
end
