class AddProcessedToImports < ActiveRecord::Migration[6.0]
  def change
    add_column :imports, :processed, :boolean, default: false
  end
end
