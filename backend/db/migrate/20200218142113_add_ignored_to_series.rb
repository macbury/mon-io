class AddIgnoredToSeries < ActiveRecord::Migration[6.0]
  def change
    add_column :series, :ignored, :json, default: []
  end
end
