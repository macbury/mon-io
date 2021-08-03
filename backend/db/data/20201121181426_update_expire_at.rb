class UpdateExpireAt < ActiveRecord::Migration[6.0]
  def up
    RefreshToken.find_each do |refresh_token|
      refresh_token.update(expire_at: refresh_token.updated_at + 1.month)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
