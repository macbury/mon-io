class AddMissingIndexes < ActiveRecord::Migration[6.0]
  def change
    add_index :budget_periods, :user_id
    add_index :categories, :user_id
    add_index :category_budgets, :budget_period_id
    add_index :category_budgets, :category_id
    add_index :category_location_suggestions, :category_id
    add_index :category_location_suggestions, :location_id
    add_index :receipts, :category_id
    add_index :receipts, :location_id
    add_index :receipts, :transaction_id
    add_index :receipts, :user_id
    add_index :refresh_tokens, :user_id
    add_index :series, :user_id
    add_index :transactions, :author_id
    add_index :transactions, :blueprint_id
    add_index :transactions, :category_id
    add_index :transactions, :import_id
    add_index :transactions, :location_id
    add_index :transactions, :series_id
  end
end
