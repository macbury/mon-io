module Download
  class ReadFavicon < Service
    use Tokens::Verify, as: :verify_token

    def initialize(token)
      @token = token
    end

    def call
      return if jwt_token.blank?

      Link.find(link_id)&.url
    end

    private

    attr_reader :token

    def jwt_token
      @jwt_token ||= verify_token(
        hmac_secret: Rails.application.secrets.secret_key_base.byteslice(0..31),
        token: token,
        aud: TokenScopes::FAVICON
      )
    end

    def link_id
      jwt_token.dig(0, 'link_id')
    end
  end
end