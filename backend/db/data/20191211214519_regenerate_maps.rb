class RegenerateMaps < ActiveRecord::Migration[6.0]
  def up
    Location.find_each do |location|
      location.generate_preview
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
