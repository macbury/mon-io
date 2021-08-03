module Security
  class VerifyProofOfWork < Service
    use Tokens::Verify, as: :decode_and_verify_token

    def initialize(jwt_token:, input:, counter:, hash:)
      @jwt_token = jwt_token
      @input = input
      @counter = counter
      @hash = hash
    end

    def call
      raise ServiceFailure, 'Invalid nonce' unless token
      raise ServiceFailure, 'Invalid proof of work' unless Digest::SHA512.hexdigest(content) == hash

      true
    rescue JWT::VerificationError
      raise ServiceFailure, 'Invalid jwt token'
    end

    private

    attr_reader :jwt_token, :counter, :input, :hash

    def token
      @token ||= decode_and_verify_token(hmac_secret: secret_key, token: jwt_token, aud: [TokenScopes::NONCE])
    end

    def content
      @content ||= [
        nonce,
        input,
        counter.to_s
      ].compact.flatten.join('-')
    end

    def nonce
      @nonce ||= token ? token.dig(0, 'nonce') : ''
    end
  end
end