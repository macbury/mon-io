module Resolvers
  class NonceToken < Base
    type String, null: true
    description 'Returns nonce that can be used by sign in'

    def resolve
      # TODO: check how many times context[:ip] tried to get this nonce. depending on that number calculate difficulty ip should be stored inside redis and have expiration time set for one day
      TokenScopes.nonce_token('000')
    end
  end
end