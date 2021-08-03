class AddIpToRefreshTokens < ActiveRecord::Migration[6.0]
  def change
    add_column :refresh_tokens, :ip, :string
  end
end
