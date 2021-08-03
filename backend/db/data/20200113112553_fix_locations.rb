class FixLocations < ActiveRecord::Migration[6.0]
  def up
    ActiveRecord::Base.transaction do
      Location.delete_all
      Transaction.update_all(location_id: nil)
      Receipt.update_all(location_id: nil)
      Receipt.all.each do |receipt|
        next unless receipt.lat

        receipt.assign_location!
      end

      Transaction.all.each do |transaction|
        if transaction.receipt
          transaction.location = transaction.receipt.location
        end

        unless transaction.location
          transaction.assign_location!
        end

        transaction.save!
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end

  private

  def plus_code
    @plus_code ||= PlusCodes::OpenLocationCode.new
  end
end
