class CreateRefreshTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :refresh_tokens, id: :string do |t|
      t.uuid :user_id

      t.timestamps
    end
  end
end
