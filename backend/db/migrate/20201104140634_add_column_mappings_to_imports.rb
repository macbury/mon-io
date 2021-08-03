class AddColumnMappingsToImports < ActiveRecord::Migration[6.0]
  def change
    add_column :imports, :notes_column, :integer
    add_column :imports, :amount_column, :integer
    add_column :imports, :date_column, :integer
  end
end
