class CreateAraskJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :arask_jobs, id: :uuid do |t|
      t.string :job
      t.datetime :execute_at
      t.string :interval
    end
    add_index :arask_jobs, :execute_at
  end
end
