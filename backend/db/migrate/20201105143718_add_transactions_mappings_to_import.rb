class AddTransactionsMappingsToImport < ActiveRecord::Migration[6.0]
  def change
    add_column :imports, :transactions_mappings, :jsonb, description: 'This field is used for storing mapping on what transactions was created using this import', default: {}
  end
end
