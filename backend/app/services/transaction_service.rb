# Run service call inside active record transaction
class TransactionService < Service
  def self.call(...)
    ActiveRecord::Base.transaction do
      super(...)
    end
  end
end