module Auth
  class ResourceWithToken < Service
    use Tokens::Decode, as: :decode_token
    use Tokens::Verify, as: :verify_token

    def initialize(jwt_token, scope)
      @jwt_token = jwt_token
      @scope = scope
    end

    def call
      return unless refresh_token
      return unless valid_jwt_token?

      refresh_token.prolong!

      refresh_token
    end

    private

    attr_reader :jwt_token, :scope

    def token_data
      @token_data ||= decode_token(jwt_token)
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
        token: jwt_token,
        aud: scope
      ).present?
    end
  end
end