class UpdateDateRange < ActiveRecord::Migration[6.0]
  def up
    ActiveRecord::Base.transaction do
      Series.find_each do |series|
        series.update!(start_at: series.created_at)
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
