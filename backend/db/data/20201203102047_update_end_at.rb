class UpdateEndAt < ActiveRecord::Migration[6.0]
  def up
    ActiveRecord::Base.transaction do
      Series.once.find_each do |series|
        time = series.schedule_data.dig('end_time', 'time')
        next unless time
        end_at = Time.zone.parse(time)
        series.update!(end_at: end_at)
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
