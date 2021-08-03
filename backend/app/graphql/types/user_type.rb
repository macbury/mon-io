module Types
  class UserType < ProfileType
    field :settings, SettingsType, null: false
    field :refresh_tokens, [SessionType], null: false
    field :long_living_refresh_tokens, [SessionType], null: false

    def settings
      {
        map_box_key: ENV.fetch('MAPBOX_API_KEY'),
        sentry_key: ENV.fetch('SENTRY_KEY', nil),
        ocr_languages: ENV.fetch('TESSERACT_OCR_LANG').split('+'),
        locale: I18n.locale,
        timezone: Time.zone.to_s,
        download_backup_url: Rails.application.routes.url_helpers.backup_url
      }
    end

    def refresh_tokens
      object.refresh_tokens.normal
    end

    def long_living_refresh_tokens
      object.refresh_tokens.long
    end
  end
end