class ChangeDateToDatetime < ActiveRecord::Migration[6.0]
  def change
    remove_column :transactions, :date
    add_column :transactions, :date, :datetime
  end
end
