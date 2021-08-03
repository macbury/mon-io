class UpdateKindForTransactions < ActiveRecord::Migration[6.0]
  def up
    Transaction.includes(:category).find_each do |transaction|
      transaction.update(kind: transaction.category.kind)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
