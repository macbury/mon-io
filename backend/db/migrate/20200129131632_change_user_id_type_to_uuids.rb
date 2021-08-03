class ChangeUserIdTypeToUuids < ActiveRecord::Migration[6.0]
  def change
    ActiveRecord::Base.transaction do
      periods = BudgetPeriod.all.to_a
      remove_column :budget_periods, :user_id
      add_column :budget_periods, :user_id, :uuid
      periods.each do |period|
        BudgetPeriod.where(id: period.id).update_all(user_id: period.id)
      end
    end
  end
end
