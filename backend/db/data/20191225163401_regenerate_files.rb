class RegenerateFiles < ActiveRecord::Migration[6.0]
  def up
    Receipt.all.each do |receipt|
      receipt.file = receipt.file
      receipt.file_derivatives!
      receipt.save!
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
