module Resolvers
  class ExchangeRate < Base
    description 'Get exchange rate'
    type Types::MoneyType, null: false

    argument :date, Types::TimeArgument, required: true
    argument :cents, Integer, required: true
    argument :from, String, required: true
    argument :to, String, required: true

    def resolve(date:, cents:, from:, to:)
      ExchangeRateService.exchange_with(date, Money.new(cents, from), to)
    end
  end
end