class AddIgnoredDates < ActiveRecord::Migration[6.0]
  def up
    ActiveRecord::Base.transaction do
      Series.find_each do |series|
        series.ignored.each do |date|
          SeriesEntry.create!(
            occured_at: date,
            series: series
          )
        end
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
