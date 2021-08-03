module Types
  class SettingsType < BaseObject
    field :map_box_key, String, null: true, description: 'Mapbox sdk key'
    field :sentry_key, String, null: true, description: 'Sentry key error reporting key'
    field :ocr_languages, [String], null: false, description: 'Languages used with ocr'
    field :locale, String, null: false, description: 'Current used locale'
    field :timezone, String, null: false, description: 'Current user timezone'
    field :currencies, [CurrencyType], null: false, description: 'List of supported currencies'
    field :main_currency, CurrencyType, null: false, description: 'Main system currency'
    field :used_currencies, [CurrencyType], null: false, description: 'Currencies used in transactions'
    field :download_backup_url, String, null: false
    field :download_apk_url, String, null: false
    field :calendar_url, String, null: false, description: 'Full url with repeating series calendar'

    def currencies
      ExchangeRate
        .distinct
        .order('currency')
        .pluck(:currency)
        .map { |iso_code| Money::Currency.wrap(iso_code) }
    end

    def used_currencies
      Transaction
        .distinct
        .order('amount_currency')
        .pluck(:amount_currency)
        .map { |iso_code| Money::Currency.wrap(iso_code) }
    end

    def main_currency
      Money::Currency.wrap(ENV.fetch('MAIN_CURRENCY'))
    end

    def calendar_url
      Rails.application.routes.url_helpers.calendar_url(
        token: TokenScopes.calendar_token(context[:refresh_token]),
        format: :ics
      )
    end

    def download_apk_url
      Rails.application.routes.url_helpers.apk_download_url
    end
  end
end
