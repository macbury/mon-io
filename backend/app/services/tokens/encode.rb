module Tokens
  class Encode < Base
    def initialize(hmac_secret:, payload:)
      @hmac_secret = hmac_secret
      @payload = payload
    end

    def call
      JWT.encode payload, secret, algorithm
    end

    private

    attr_reader :payload, :hmac_secret
  end
end