class UpdateCategoriesKind < ActiveRecord::Migration[6.0]
  def up
    Category.update_all(kind: :expense)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
