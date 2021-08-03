class AddKindToRefreshTokens < ActiveRecord::Migration[6.0]
  def up
    add_column :refresh_tokens, :kind, :string, default: 'normal'
    RefreshToken.update_all(kind: 'normal')
  end

  def down
    remove_column :refresh_tokens, :kind
  end
end
