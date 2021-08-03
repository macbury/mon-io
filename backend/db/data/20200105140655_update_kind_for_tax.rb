class UpdateKindForTax < ActiveRecord::Migration[6.0]
  def up
    category = Category.find_by(name: 'Taxes')
    category.tax!
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
