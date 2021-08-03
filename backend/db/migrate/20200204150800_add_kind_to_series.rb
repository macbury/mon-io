class AddKindToSeries < ActiveRecord::Migration[6.0]
  def change
    add_column :series, :recurrence, :string, default: 'none'
  end
end
