class CreateIncomeCategory < ActiveRecord::Migration[6.0]
  def up
    Category.create({
      kind: 'income',
      name: 'Payment',
      icon: 'MaterialCommunityIcons:safe',
      color: '#4cb050'
    })
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
