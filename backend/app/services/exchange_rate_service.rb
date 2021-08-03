class ExchangeRateService < Service
  def self.get_rate(from_iso_code, to_iso_code, date = nil)
    date ||= Time.zone.today
    Rails.cache.fetch(['rates', from_iso_code, to_iso_code, date], expires_in: 1.week) do
      ExchangeRate.find_by(base: from_iso_code, currency: to_iso_code, date: date)&.value ||
        ExchangeRate.find_by(base: from_iso_code, currency: to_iso_code)&.value
    end
  end

  def self.add_rate(base, currency, value, date)
    rate = ExchangeRate.find_or_initialize_by(date: date, currency: currency, base: base)
    rate.value = value
    rate.save!
  end

  #   Exchanges the given +Money+ object to a new +Money+ object in
  #   +to_currency+. The exchange rate used will be for Date.today.
  #   If no rates are here for Date.today, it will try to load them.
  #   @param  [Date] date The +Date+ at which you want to calculate the rate.
  #   @param  [Money] from
  #           The +Money+ object to exchange.
  #   @param  [Currency, String, Symbol] to_currency
  #           The currency to exchange to.
  #   @return [Money]
  def self.exchange_with(date, from, target_currency)
    to_currency = Money::Currency.wrap(target_currency)

    return from if to_currency == from.currency

    rate = get_rate(from.currency.iso_code, target_currency, date)
    raise "Could not find rate from #{from.currency} to #{target_currency}" unless rate

    cents = BigDecimal(from.cents.to_s) / (BigDecimal(from.currency.subunit_to_unit.to_s) / BigDecimal(to_currency.subunit_to_unit.to_s))

    ex = cents * BigDecimal(rate.to_s)

    Money.new(ex.to_f, to_currency)
  end
end