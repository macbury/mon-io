class CreateCategoriesBase < ActiveRecord::Migration[6.0]
  def up
    {
      'Car' => ['MaterialCommunityIcons:car', '#f44236'],
      'House' => ['MaterialCommunityIcons:home', '#ff9700'],
      'Groceries' => ['MaterialCommunityIcons:shopping', '#607d8b'],
      'Media' => ['MaterialIcons:local-movies', '#3f51b5'],
      'Taxes' => ['MaterialCommunityIcons:pirate', '#9c28b1'],
      'Food' => ['MaterialCommunityIcons:food-fork-drink', '#2196f3'],
      'Health' => ['MaterialIcons:healing', '#009788'],
      'Entertaiment' => ['MaterialIcons:local-movies', '#9e9e9e'],
      'Family' => ['MaterialCommunityIcons:baby-buggy', '#795547'],
      'Beauty' => ['MaterialCommunityIcons:brush', '#683ab7'],
      'Tech' => ['MaterialIcons:computer', '#8bc24a'],
      'Transportation' => ['MaterialCommunityIcons:bus', '#ea1e63']
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
