module Imports
  # Import rows as transactions to database. Track what transactions were created, and if necessary remove old ones
  class Transactions < Service
    def initialize(import:, rows:)
      @import = import
      @rows = rows
    end

    def call
      Transaction.transaction do
        destroy_missing_transactions
        create_or_update_transactions
      end
    end

    private

    attr_reader :import, :rows

    def destroy_missing_transactions
      existing_uuids = import.transactions_mappings.keys
      new_uuids = rows.map(&:uuid)

      missing_uuids = existing_uuids - new_uuids
      missing_transaction_ids = import.transactions_mappings.map do |uuid, transaction_id|
        missing_uuids.include?(uuid) ? transaction_id : nil
      end.compact

      import.transactions.where('id not in (?)', missing_transaction_ids).destroy_all
    end

    def convert_to_currency(amount)
      Money::Currency.wrap(amount)
    rescue Money::Currency::UnknownCurrency
      amount.to_money(import.category&.currency)
    end

    def create_or_update_transactions
      rows.each do |row|
        amount = convert_to_currency(row.amount)
        next unless amount
        next if amount.zero?

        transaction = find_or_build_transaction(row.uuid)

        transaction.assign_attributes(
          category: import.category,
          author: import.user,
          notes: row.notes&.strip,
          date: row.date,
          amount: amount,
          kind: row.kind
        )

        if transaction.save
          import.transactions_mappings[row.uuid] = transaction.id
        else
          log("Could not save transaction: #{transaction.errors.full_messages}")
        end
      end
    end

    def find_or_build_transaction(uuid)
      transaction_id = import.transactions_mappings[uuid]

      import.transactions.find_or_initialize_by(id: transaction_id)
    end
  end
end