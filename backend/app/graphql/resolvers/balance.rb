module Resolvers
  class Balance < Base
    description 'Show history of change in balance for specified category'
    use Transactions::AccumulatedBalanceFor, as: :balance_accumulated_for
    use Transactions::BalanceFor, as: :balance_for

    type Types::BalanceType, null: false

    AggregationEnum = GraphQL::EnumType.define do
      name 'Aggregation'

      value 'None', value: :none
      value 'Sum', value: :sum
    end

    argument :category_id, ID, required: true
    argument :aggregation, AggregationEnum, required: false

    def resolve(category_id:, aggregation: nil)
      category = Category.for_user(current_user).find(category_id)

      if aggregation == :sum
        {
          category: category,
          history: balance_accumulated_for(category: category, users: [current_user])
        }
      else
        {
          category: category,
          history: balance_for(category: category, users: [current_user])
        }
      end
    end
  end
end