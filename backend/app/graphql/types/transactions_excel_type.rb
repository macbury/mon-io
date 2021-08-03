module Types
  class TransactionsExcelType < BaseObject
    use Reports::TransactionList, as: :generate_transaction_list

    field :list, Base64FileType, null: false, description: 'List of all transactions in xlsx format'

    def list
      generate_transaction_list(object)
    end
  end
end
