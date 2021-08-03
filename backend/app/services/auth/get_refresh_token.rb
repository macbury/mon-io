module Auth
  class GetRefreshToken < Service
    use Tokens::Decode, as: :decode_token
    use Tokens::Verify, as: :verify_token

    def initialize(token)
      @token = token
    end

    def call
      return unless refresh_token_id
      return unless valid_jwt_token?

      refresh_token
    rescue ActiveRecord::RecordNotFound
      nil
    end

    private

    attr_reader :token

    def refresh_token_id
      @refresh_token_id ||= decode_token(token)&.dig(0, 'refresh_token_id')
    end

    def refresh_token
      @refresh_token ||= RefreshToken.find(refresh_token_id)
    end

    def valid_jwt_token?
      verify_token(
        hmac_secret: refresh_token.jwt_hmac_secret_base,
        token: token,
        aud: TokenScopes::GENERATE_ACCESS_TOKEN
      ).present?
    end
  end
end