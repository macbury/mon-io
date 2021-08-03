class CreateHobby < ActiveRecord::Migration[6.0]
  def up
    category = Category.find_or_initialize_by(name: 'Tech')

    category.assign_attributes(
      name: 'Hobby',
      icon: 'MaterialCommunityIcons:cannabis',
      color: '#8bc24a'
    )

    category.save!
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
