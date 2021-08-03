class FixKindsOnCategoryBudgets < ActiveRecord::Migration[6.0]
  def up
    CategoryBudget.all.find_each do |category_budget|
      if category_budget.category.saving?
        category_budget.update!(kind: :deposit)
      else
        category_budget.update!(kind: category_budget.category.kind)
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
