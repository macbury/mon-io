module Types
  class TransactionEdgeType < GraphQL::Types::Relay::BaseEdge
    node_type(TransactionType)
  end
end