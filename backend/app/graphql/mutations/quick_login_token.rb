module Mutations
  class QuickLoginToken < Types::BaseMutation
    use Auth::GetRefreshToken, as: :get_refresh_token
    null true

    argument :refresh_token, String, required: true
    field :token, String, null: true

    def resolve(refresh_token:)
      refresh_token = get_refresh_token(
        refresh_token
      )

      {
        token: refresh_token ? TokenScopes.quick_login_token(refresh_token) : nil
      }
    end
  end
end