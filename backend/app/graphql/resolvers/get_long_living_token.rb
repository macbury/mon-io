module Resolvers
  class GetLongLivingToken < Base
    type String, null: true

    argument :id, ID, required: true

    def resolve(id:)
      refresh_token = current_user.refresh_tokens.long.find(id)

      TokenScopes.access_token(refresh_token, expire_at: 10.years.from_now)
    end
  end
end