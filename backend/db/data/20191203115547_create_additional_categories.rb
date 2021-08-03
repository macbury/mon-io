class CreateAdditionalCategories < ActiveRecord::Migration[6.0]
  def up
    {
      'Pets' => ['MaterialCommunityIcons:cat', '#827717'],
      'Office' => ['MaterialCommunityIcons:desk-lamp', '#1b5e20']
    }.each do |name, (icon, color)|
      category = Category.find_or_initialize_by(name: name)
      if category.new_record?
        puts "Creating: #{name}"
      else
        puts "Updating: #{name}"
      end

      category.assign_attributes(icon: icon, color: color)
      category.save!
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
