module Download
  class ReadObject < Auth::ResourceWithToken
    def initialize(jwt_token)
      super(jwt_token, TokenScopes::DOWNLOAD_RESOURCE)
    end

    def call
      return unless super

      GlobalID::Locator.locate(token_data&.dig(0, 'gid'))
    end
  end
end