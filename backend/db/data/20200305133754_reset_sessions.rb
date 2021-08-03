class ResetSessions < ActiveRecord::Migration[6.0]
  def up
    RefreshToken.delete_all
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
