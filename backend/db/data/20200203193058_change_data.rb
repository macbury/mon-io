class ChangeData < ActiveRecord::Migration[6.0]
  def up
    category = Category.find_by(name: 'Taxes')
    category&.transactions&.each do |transaction|
      transaction.amount = transaction.amount.abs * -1
      transaction.save!
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
