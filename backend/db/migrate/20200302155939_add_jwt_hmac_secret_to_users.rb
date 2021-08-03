class AddJwtHmacSecretToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :jwt_hmac_secret, :string
  end
end
