# encoding : utf-8
require 'currency_rate'
require_relative '../../app/services/service'
require_relative '../../app/services/exchange_rate_service'

Money.locale_backend = :i18n

CurrencyRate.configure do |config|
  # CurrencyRate::FileStorage configuration has only 'path' attribute
  config.file_storage[:path] = Rails.root.join('storage')

  if ENV.fetch('FIXER_API_KEY', '').present?
    config.api_keys['FixerAdapter'] = ENV.fetch('FIXER_API_KEY')
    # Fiat exchange adapters to fetch
    config.fiat_adapters = ['Fixer']
  end

  # Cryptocurrency exchange adapters to fetch
  config.crypto_adapters = ['Coinbase']
end

MoneyRails.configure do |config|
  # To set the default currency
  #
  config.default_currency = ENV.fetch('MAIN_CURRENCY')
  config.default_bank = Money::Bank::VariableExchange.new(ExchangeRateService)

  # Add exchange rates to current money bank object.
  # (The conversion rate refers to one direction only)
  #
  # Example:
  # config.add_rate "USD", "CAD", 1.24515
  # config.add_rate "CAD", "USD", 0.803115

  # To handle the inclusion of validations for monetized fields
  # The default value is true
  #
  # config.include_validations = true

  # Default ActiveRecord migration configuration values for columns:
  #
  # config.amount_column = { prefix: '',           # column name prefix
  #                          postfix: '_cents',    # column name  postfix
  #                          column_name: nil,     # full column name (overrides prefix, postfix and accessor name)
  #                          type: :integer,       # column type
  #                          present: true,        # column will be created
  #                          null: false,          # other options will be treated as column options
  #                          default: 0
  #                        }
  #
  # config.currency_column = { prefix: '',
  #                            postfix: '_currency',
  #                            column_name: nil,
  #                            type: :string,
  #                            present: true,
  #                            null: false,
  #                            default: 'USD'
  #                          }

  # Register a custom currency
  #
  Money::Currency.unregister('XAU')
  Money::Currency.unregister('XAG')

  config.register_currency = {
    priority: 100,
    iso_code: 'XAU',
    name: 'Gold (Troy Ounce)',
    symbol: 'oz t',
    disambiguate_symbol: 'XAU',
    alternate_symbols: [],
    subunit: 'oz',
    subunit_to_unit: 100,
    symbol_first: false,
    format: '%n %u',
    html_entity: '',
    decimal_mark: '.',
    thousands_separator: ',',
    iso_numeric: 959,
    smallest_denomination: 1
  }

  config.register_currency = {
    priority: 100,
    iso_code: 'XAG',
    name: 'Silver (Troy Ounce)',
    symbol: 'oz t',
    disambiguate_symbol: 'XAG',
    alternate_symbols: [],
    subunit: 'oz',
    subunit_to_unit: 100,
    symbol_first: false,
    format: '%n %u',
    html_entity: '',
    decimal_mark: '.',
    thousands_separator: ',',
    iso_numeric: 959,
    smallest_denomination: 1
  }

  config.register_currency = {
    priority:            1,
    iso_code:            "ETH",
    name:                "Ethereum",
    symbol:              "Ξ",
    symbol_first:        false,
    subunit:             "WEI",
    subunit_to_unit:     100000000,
    thousands_separator: ".",
    decimal_mark:        ","
  }

  config.register_currency = {
    priority:            1,
    iso_code:            "GAU",
    name:                "Gold Gram",
    symbol:              "GAU",
    symbol_first:        false,
    subunit:             "GAU",
    subunit_to_unit:     1 ,
    thousands_separator: ".",
    decimal_mark:        ","
  }

  config.register_currency = {
    priority:            1,
    iso_code:            "GAU",
    name:                "Gold Gram",
    symbol:              "GAU",
    symbol_first:        false,
    subunit:             "GAU",
    subunit_to_unit:     1 ,
    thousands_separator: ".",
    decimal_mark:        ","
  }

  config.register_currency = {
    priority:            1,
    iso_code:            "GAG",
    name:                "Silver Gram",
    symbol:              "GAG",
    symbol_first:        false,
    subunit:             "GAG",
    subunit_to_unit:     1 ,
    thousands_separator: ".",
    decimal_mark:        ","
  }

  # Specify a rounding mode
  # Any one of:
  #
  # BigDecimal::ROUND_UP,
  # BigDecimal::ROUND_DOWN,
  # BigDecimal::ROUND_HALF_UP,
  # BigDecimal::ROUND_HALF_DOWN,
  # BigDecimal::ROUND_HALF_EVEN,
  # BigDecimal::ROUND_CEILING,
  # BigDecimal::ROUND_FLOOR
  #
  # set to BigDecimal::ROUND_HALF_EVEN by default
  #
  config.rounding_mode = BigDecimal::ROUND_HALF_UP

  # Set default money format globally.
  # Default value is nil meaning "ignore this option".
  # Example:
  #
  # config.default_format = {
  #   no_cents_if_whole: nil,
  #   symbol: nil,
  #   sign_before_symbol: nil
  # }

  # If you would like to use I18n localization (formatting depends on the
  # locale):
  config.locale_backend = :i18n
  #
  # Example (using default localization from rails-i18n):
  #
  # I18n.locale = :en
  # Money.new(10_000_00, 'USD').format # => $10,000.00
  # I18n.locale = :es
  # Money.new(10_000_00, 'USD').format # => $10.000,00
  #
  # For the legacy behaviour of "per currency" localization (formatting depends
  # only on currency):
  # config.locale_backend = :currency
  #
  # Example:
  # Money.new(10_000_00, 'USD').format # => $10,000.00
  # Money.new(10_000_00, 'EUR').format # => €10.000,00
  #
  # In case you don't need localization and would like to use default values
  # (can be redefined using config.default_format):
  # config.locale_backend = nil

  # Set default raise_error_on_money_parsing option
  # It will be raise error if assigned different currency
  # The default value is false
  #
  # Example:
  # config.raise_error_on_money_parsing = false
end
