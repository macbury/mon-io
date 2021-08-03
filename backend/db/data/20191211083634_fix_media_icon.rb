class FixMediaIcon < ActiveRecord::Migration[6.0]
  def up
    category = Category.find_by(name: 'Media')
    category.assign_attributes(
      icon: 'MaterialCommunityIcons:solar-power'
    )
    category.save
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
