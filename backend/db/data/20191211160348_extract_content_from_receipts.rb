class ExtractContentFromReceipts < ActiveRecord::Migration[6.0]
  def up
    Receipt.find_each(batch_size: 100) do |receipt|
      receipt.file.refresh_metadata!
      receipt.file_data = receipt.file.data
      receipt.save
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
