module Tokens
  class Base < Service
    protected

    attr_reader :hmac_secret

    def secret
      @secret ||= Digest::SHA512.hexdigest(
        hmac_secret + Rails.application.secrets.secret_key_base
      )
    end

    def algorithm
      'HS256'
    end

    def jwt_options
      {
        algorithm: algorithm
      }
    end
  end
end