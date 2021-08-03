module Auth
  class QuickAuthWithToken < Service
    use Tokens::Decode, as: :decode_token
    use Tokens::Verify, as: :verify_token

    def initialize(token, name, ip)
      @token = token
      @name = name
      @ip = ip
    end

    def call
      return unless refresh_token
      return unless valid_jwt_token?

      refresh_token.user.refresh_tokens.create!(name: name, ip: ip)
    end

    private

    attr_reader :token, :name, :ip

    def token_data
      @token_data ||= decode_token(token)
    end

    def refresh_token_id
      @refresh_token_id ||= token_data&.dig(0, 'refresh_token_id')
    end

    def refresh_token
      @refresh_token ||= RefreshToken.find_by(id: refresh_token_id)
    end

    def valid_jwt_token?
      verify_token(
        hmac_secret: refresh_token.jwt_hmac_secret_base,
        token: token,
        aud: TokenScopes::QUICK_LOGIN,
        iss: Rails.application.routes.url_helpers.endpoint_url
      ).present?
    end
  end
end