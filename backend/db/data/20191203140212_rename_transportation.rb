class RenameTransportation < ActiveRecord::Migration[6.0]
  def up
    category = Category.find_by(name: 'Transportation')
    category&.update_attributes(name: 'Transport')
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
