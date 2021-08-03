module Types
  class BalancePeriodType < Types::BaseObject
    description 'Balance for month'
    field :value, MoneyType, null: false, description: 'Amount in category currency'
    field :exchanged_value, MoneyType, null: false, description: 'Exchanged amount in main system currency'
    field :month, GraphQL::Types::ISO8601Date, null: false

    def exchanged_value
      ExchangeRateService.exchange_with(month, object[:value], ENV.fetch('MAIN_CURRENCY'))
    end

    def month
      current_month? ? Time.zone.today : object[:month].end_of_month
    end

    private

    def current_month?
      Time.zone.today.at_beginning_of_month <= object[:month]
    end
  end
end
