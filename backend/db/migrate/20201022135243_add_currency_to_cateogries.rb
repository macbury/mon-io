class AddCurrencyToCateogries < ActiveRecord::Migration[6.0]
  def change
    add_column :categories, :currency, :string
  end
end
