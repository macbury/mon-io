class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links, id: :uuid do |t|
      t.string :url

      t.timestamps
    end
  end
end
