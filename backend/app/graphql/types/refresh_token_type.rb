module Types
  class RefreshTokenType < SessionType
    field :user, UserType, null: false
    field :token, String, null: false

    def token
      TokenScopes.refresh_token(object)
    end
  end
end
