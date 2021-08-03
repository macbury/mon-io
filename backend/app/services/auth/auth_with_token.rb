module Auth
  class AuthWithToken < ResourceWithToken
    def initialize(access_token)
      super(access_token, TokenScopes::OWN_RESOURCES)
    end

    def call
      return unless super

      refresh_token.prolong!
      refresh_token
    end
  end
end