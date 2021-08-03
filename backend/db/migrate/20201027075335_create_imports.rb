class CreateImports < ActiveRecord::Migration[6.0]
  def change
    create_table :imports, id: :uuid do |t|
      t.jsonb :file_data
      t.string :signature
      t.string :name
      t.integer :from_line, default: 0
      t.integer :to_line, default: 0
      t.string :delimiter
      t.string :encoding, default: 'UTF-8'

      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.belongs_to :category, null: true, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
