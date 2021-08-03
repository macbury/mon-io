module Types
  class MoneyArgument < GraphQL::Schema::Scalar
    description 'Represents money value'

    def self.coerce_input(value, _context)
      value.to_money
    end
  end
end
