class CleanupOldColumns < ActiveRecord::Migration[6.0]
  def change
    remove_index :transactions, :series_id

    remove_column :transactions, :type
    remove_column :transactions, :series_id
    remove_column :transactions, :series_date
    remove_column :users, :jwt_hmac_secret
    remove_column :series, :schedule_data
    remove_column :series, :ignored
  end
end
