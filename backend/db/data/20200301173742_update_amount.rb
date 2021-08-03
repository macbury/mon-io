class UpdateAmount < ActiveRecord::Migration[6.0]
  def up
    Transaction.all.each do |transaction|
      transaction.update_amount
      transaction.save
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
