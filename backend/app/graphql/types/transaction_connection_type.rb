module Types
  class TransactionConnectionType < GraphQL::Types::Relay::BaseConnection
    edge_type(TransactionEdgeType)

    field :total_count, Integer, null: false
    field :report, TransactionsExcelType, null: false

    def total_count
      object.nodes.size
    end

    def report
      object.nodes
    end
  end
end