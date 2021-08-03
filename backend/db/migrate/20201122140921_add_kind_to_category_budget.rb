class AddKindToCategoryBudget < ActiveRecord::Migration[6.0]
  def change
    add_column :category_budgets, :kind, :integer, default: 0
    add_index :category_budgets, :kind
  end
end
