require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie" unless Rails.env.production?
require 'search_object'
require 'search_object/plugin/graphql'
require 'plus_codes/open_location_code'
require 'async/http'
require 'async/http/internet'
require 'mimemagic'

require_relative '../app/services/usable'
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Monio
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.time_zone = ENV.fetch('MONIO_TIMEZONE')
    config.middleware.use BatchLoader::Middleware
    config.i18n.fallbacks = [I18n.default_locale]

    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end
  end
end
