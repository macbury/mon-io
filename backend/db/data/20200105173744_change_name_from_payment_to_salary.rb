class ChangeNameFromPaymentToSalary < ActiveRecord::Migration[6.0]
  def up
    category = Category.find_by(name: 'Payment')
    category&.update(name: 'Salary')
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
