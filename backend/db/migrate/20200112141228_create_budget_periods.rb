class CreateBudgetPeriods < ActiveRecord::Migration[6.0]
  def change
    create_table :budget_periods, id: :uuid do |t|
      t.date :date
      t.string :user_id

      t.timestamps
    end
  end
end
