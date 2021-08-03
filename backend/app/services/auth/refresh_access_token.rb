module Auth
  class RefreshAccessToken < Service
    use GetRefreshToken, as: :get_refresh_token

    def initialize(token)
      @token = token
    end

    def call
      return unless refresh_token

      TokenScopes.access_token(refresh_token)
    rescue ActiveRecord::RecordNotFound
      nil
    end

    private

    attr_reader :token

    def refresh_token
      @refresh_token ||= get_refresh_token(token)
    end
  end
end