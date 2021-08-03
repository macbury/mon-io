uri = URI.parse(ENV.fetch('APP_HOST'))

Rails.application.routes.default_url_options = {
  host: uri.host,
  port: uri.port,
  protocol: uri.scheme
}

if Rails.env.development?
  Rails.application.config.hosts << 'monio.here'
  Rails.application.config.hosts << uri.host
end