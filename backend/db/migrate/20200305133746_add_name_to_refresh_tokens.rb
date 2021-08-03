class AddNameToRefreshTokens < ActiveRecord::Migration[6.0]
  def change
    add_column :refresh_tokens, :name, :string
  end
end
