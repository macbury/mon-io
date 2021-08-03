if ENV.key?('SENTRY_KEY')
  require 'raven'
  Raven.configure do |config|
    config.dsn = ENV.fetch('SENTRY_KEY', nil)
  end
end