module Types
  class PlannedTransactionType < TransactionType
    def id
      SecureRandom.uuid
    end
  end
end