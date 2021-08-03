module TokenScopes
  # Token with scope is used only for retriving new access token
  GENERATE_ACCESS_TOKEN = 'generate_access_token'.freeze
  # Token with this scope is used for retriving all resources assigned to current user
  OWN_RESOURCES = 'own_resources'.freeze
  # This scope can be use to quickly login
  QUICK_LOGIN = 'quick_login'.freeze
  # This scope can be use to give access to calendar
  CALENDAR = 'calendar'.freeze
  # This scope allows user to download a file
  DOWNLOAD_RESOURCE = 'download_resource'.freeze
  # Used for sign in Proof of work
  NONCE = 'nonce'.freeze
  # Used for serving favicon
  FAVICON = 'favicon'.freeze

  def self.refresh_token(refresh_token)
    generate_token(
      refresh_token: refresh_token,
      scopes: [GENERATE_ACCESS_TOKEN]
    )
  end

  def self.access_token(refresh_token, expire_at: nil)
    generate_token(
      refresh_token: refresh_token,
      scopes: [OWN_RESOURCES],
      expire_at: expire_at || 10.minutes.from_now
    )
  end

  def self.quick_login_token(refresh_token)
    generate_token(
      refresh_token: refresh_token,
      scopes: [QUICK_LOGIN],
      expire_at: 30.seconds.from_now,
      payload: {
        iss: Rails.application.routes.url_helpers.endpoint_url
      }
    )
  end

  def self.calendar_token(refresh_token)
    generate_token(
      refresh_token: refresh_token,
      scopes: [CALENDAR]
    )
  end

  def self.download_resource(refresh_token, resource)
    generate_token(
      refresh_token: refresh_token,
      scopes: [DOWNLOAD_RESOURCE],
      expire_at: 2.hours.from_now,
      payload: {
        gid: resource.to_gid.to_s
      }
    )
  end

  def self.generate_token(refresh_token:, scopes:, expire_at: nil, payload: {})
    payload = payload.merge(
      aud: scopes,
      refresh_token_id: refresh_token.id
    )

    payload[:exp] = expire_at.to_i if expire_at

    Tokens::Encode.call(
      hmac_secret: refresh_token.jwt_hmac_secret_base,
      payload: payload
    )
  end

  def self.favicon_token(link_id:)
    Tokens::Encode.call(
      hmac_secret: Rails.application.secrets.secret_key_base.byteslice(0..31),
      payload: {
        aud: [FAVICON],
        link_id: link_id,
        exp: 1.day.from_now.end_of_day.to_i
      }
    )
  end

  def self.nonce_token(difficulty)
    Tokens::Encode.call(
      hmac_secret: Rails.application.secrets.secret_key_base.byteslice(0..31),
      payload: {
        aud: [NONCE],
        nonce: SecureRandom.hex(32),
        difficulty: difficulty,
        exp: 1.minute.from_now.to_i
      }
    )
  end
end