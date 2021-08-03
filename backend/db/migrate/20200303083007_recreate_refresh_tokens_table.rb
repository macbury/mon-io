class RecreateRefreshTokensTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :refresh_tokens
    create_table :refresh_tokens, id: :uuid do |t|
      t.uuid :user_id
      t.string :jwt_hmac_secret_base

      t.timestamps
    end
  end
end
