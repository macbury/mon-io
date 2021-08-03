class UpdateRefreshTokensIp < ActiveRecord::Migration[6.0]
  def up
    RefreshToken.update_all(ip: '127.0.0.1')
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
