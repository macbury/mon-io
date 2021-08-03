class InitializeExchangeRate < ActiveRecord::Migration[6.0]
  def up
    Currency::SyncExchangeRate.call
  rescue
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
