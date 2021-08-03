class CreateExchangeRates < ActiveRecord::Migration[6.0]
  def change
    create_table :exchange_rates, id: :uuid do |t|
      t.date    :date,                              null: false
      t.string  :base,                              null: false
      t.string  :currency,                          null: false
      t.decimal :value, null: false
    end

    add_index :exchange_rates, :date
    add_index :exchange_rates, :currency
  end
end
