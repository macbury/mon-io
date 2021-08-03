module Currency
  class SyncExchangeRate < Service
    def call
      CurrencyRate.sync!

      currencies.each do |currency|
        rate = find_rate(main_currency, currency)
        ExchangeRateService.add_rate(main_currency, currency, rate, today) if rate

        next_rate = find_rate(currency, main_currency)
        ExchangeRateService.add_rate(currency, main_currency, next_rate, today) if next_rate
      end

      convert_metals_ounces_into_grams

      old_exchange_rates
        .where(base: main_currency)
        .where('currency NOT IN (?)', used_currencies)
        .delete_all

      old_exchange_rates
        .where('base NOT IN (?)', used_currencies)
        .where(currency: main_currency)
        .delete_all
    end

    private

    GRAM_TO_OUNCE = 0.03215 # 1 Gram Weight = 0.03215 Troy Ounce

    METALS = {
      'XAU' => 'GAU',
      'XAG' => 'GAG'
    }.freeze

    def convert_metals_ounces_into_grams
      METALS.each do |from, to|
        rate = Money.new('1', from).exchange_to(main_currency) * GRAM_TO_OUNCE
        ExchangeRateService.add_rate(to, main_currency, rate.to_f, today)
        ExchangeRateService.add_rate(main_currency, to, (1.0 / rate.to_f), today)
      end
    end

    def old_exchange_rates
      ExchangeRate.where('date <= ?', 1.month.ago)
    end

    def used_currencies
      @used_currencies ||= Transaction.group(:amount_currency).pluck(:amount_currency)
    end

    def today
      @today ||= Time.zone.today
    end

    def main_currency
      Money.default_currency.iso_code.upcase
    end

    def currencies
      Money::Currency.all.map(&:to_s)
    end

    def find_rate(from, to)
      CurrencyRate.fetch_fiat(from, to) || CurrencyRate.fetch_crypto('Coinbase', from, to)
    end
  end
end